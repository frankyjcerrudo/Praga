"use strict";

const BP_BASE = "https://mntappbp.ryanair.com";
const ORDERS_BASE = "https://services-api.ryanair.com";
const WWW_BASE = "https://www.ryanair.com";
const APP_VER = "3.243.0";
const DEFAULT_PNR = "B5Y4FQ";
const DEFAULT_EMAIL = "fjcerrudo@gmail.com";

function badge(text, color) {
  chrome.action.setBadgeText({ text });
  if (color) chrome.action.setBadgeBackgroundColor({ color });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isRyanairUrl(url) {
  return /^https:\/\/([^/]+\.)?ryanair\.com\//i.test(url || "");
}

function decodeCustomerId(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const payload = JSON.parse(json);
    return payload.sub || null;
  } catch {
    return null;
  }
}

async function getSessionToken() {
  try {
    const cookie = await chrome.cookies.get({
      url: WWW_BASE,
      name: "SESSION_COOKIE"
    });
    if (cookie?.value) return cookie.value;
  } catch {
    // Fallback below
  }

  try {
    const all = await chrome.cookies.getAll({
      domain: "ryanair.com",
      name: "SESSION_COOKIE"
    });
    const found = all.find(c => c?.value);
    return found ? found.value : null;
  } catch {
    return null;
  }
}

async function fetchFreshSessionToken(cid) {
  const resp = await fetch(`${WWW_BASE}/api/usrprof/v2/accounts/${encodeURIComponent(cid)}/sessionToken`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
      "client": "desktop",
      "client-version": "0.162.0 (desktop)"
    }
  });
  if (!resp.ok) {
    throw new Error(`sessionToken ${resp.status}: inicia sesión en ryanair.com primero.`);
  }
  const data = await resp.json();
  if (!data?.token) {
    throw new Error("sessionToken no devolvió un token válido.");
  }
  return data.token;
}

async function getFingerprint() {
  const { fp } = await chrome.storage.local.get("fp");
  if (fp) return fp;
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  const hex = [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
  await chrome.storage.local.set({ fp: hex });
  return hex;
}

async function fetchActiveBookingIds(customerId, xAuthToken) {
  const baseUrl = `${ORDERS_BASE}/orders/v2/orders/${encodeURIComponent(customerId)}/details?type=flight&active=true&order=ASC`;
  const headers = {
    "content-type": "application/json",
    "accept": "*/*",
    "client": "ios",
    "x-auth-token": xAuthToken
  };

  const bookingIds = new Set();
  const seenTokens = new Set();
  let nextToken = null;

  for (let page = 0; page < 20; page++) {
    const url = nextToken ? `${baseUrl}&nextToken=${encodeURIComponent(nextToken)}` : baseUrl;
    const resp = await fetch(url, {
      method: "GET",
      headers,
      credentials: "include"
    });

    if (!resp.ok) {
      if (resp.status === 401 || resp.status === 403) {
        const err = new Error(`orders ${resp.status}`);
        err.status = resp.status;
        throw err;
      }
      throw new Error(`orders ${resp.status}: ${(await resp.text()).slice(0, 120)}`);
    }

    const body = await resp.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    for (const item of items) {
      const id = Number(item?.rawBooking?.bookingId ?? item?.payload?.booking?.bookingId);
      if (Number.isFinite(id) && id > 0) {
        bookingIds.add(id);
      }
    }

    nextToken = body?.nextToken;
    if (!nextToken || seenTokens.has(nextToken)) break;
    seenTokens.add(nextToken);
  }

  return [...bookingIds];
}

function dedupeValidPasses(passes) {
  const seen = new Set();
  const valid = [];
  for (const bp of passes) {
    if (!bp || typeof bp.barcode !== "string") continue;
    const code = bp.barcode.trim();
    if (!code || seen.has(code)) continue;
    seen.add(code);
    valid.push(bp);
  }
  return valid;
}

async function postJson(url, headers, bodyObj, withCredentials = false) {
  const opts = {
    method: "POST",
    headers,
    body: JSON.stringify(bodyObj)
  };
  if (withCredentials) {
    opts.credentials = "include";
  }
  const resp = await fetch(url, opts);
  if (!resp.ok) {
    const text = (await resp.text()).slice(0, 160);
    const err = new Error(`HTTP ${resp.status}: ${text}`);
    err.status = resp.status;
    throw err;
  }
  const data = await resp.json();
  return Array.isArray(data) ? data : (data ? [data] : []);
}

async function fetchAllPasses(customerId, xAuthToken, pnrHint) {
  let bookingIds = [];
  let rawPasses = [];
  let needsFallback = false;

  // 1. Flujo principal (estilo RyanQuack con client: "ios")
  if (xAuthToken && customerId) {
    try {
      bookingIds = await fetchActiveBookingIds(customerId, xAuthToken);
    } catch (err) {
      console.warn("[PragaExt] Error en orders/details:", err);
      if (err?.status === 401 || err?.status === 403) {
        needsFallback = true;
      }
    }

    for (const bookingId of bookingIds) {
      try {
        const chunk = await postJson(
          `${BP_BASE}/v1/boardingpasses`,
          {
            "content-type": "application/json",
            "accept": "*/*",
            "client": "ios",
            "x-auth-token": xAuthToken
          },
          { customerId, bookingIds: [bookingId], xAuthToken },
          true
        );
        rawPasses.push(...chunk);
      } catch (err) {
        console.warn(`[PragaExt] /v1/boardingpasses (iOS) booking ${bookingId}:`, err);
        if (err?.status === 401 || err?.status === 403) {
          needsFallback = true;
        }
      }
    }
  } else {
    needsFallback = true;
  }

  let valid = dedupeValidPasses(rawPasses);

  // 2. Fallback automático si hay 0 tarjetas con barcode o 401/403
  if (valid.length === 0 || needsFallback) {
    let freshToken = null;
    try {
      freshToken = await fetchFreshSessionToken(customerId);
    } catch (err) {
      console.warn("[PragaExt] Fallback sessionToken falló:", err);
      if (valid.length === 0 && !xAuthToken) {
        throw new Error("Inicia sesión en ryanair.com primero.");
      }
    }

    if (freshToken && valid.length === 0) {
      const fp = await getFingerprint();
      const androidHeaders = {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": freshToken,
        "client": "android",
        "client-os": "34",
        "client-version": APP_VER,
        "client-carrier-code": "FR",
        "X-DEVICE-FINGERPRINT": fp
      };

      if (bookingIds.length === 0) {
        try {
          bookingIds = await fetchActiveBookingIds(customerId, freshToken);
        } catch (err) {
          console.warn("[PragaExt] Fallback orders/details falló:", err);
        }
      }

      for (const bookingId of bookingIds) {
        try {
          const chunk = await postJson(
            `${BP_BASE}/v1/boardingpasses`,
            androidHeaders,
            { CustomerId: customerId, BookingIds: [bookingId] },
            false
          );
          rawPasses.push(...chunk);
        } catch (err) {
          console.warn(`[PragaExt] /v1/boardingpasses (Android) booking ${bookingId}:`, err);
        }
      }

      valid = dedupeValidPasses(rawPasses);

      // 3. Fallback por PNR + Email si sigue devolviendo 0 tarjetas con barcode
      if (valid.length === 0) {
        const recordLocator = (pnrHint || DEFAULT_PNR).trim().toUpperCase();
        try {
          const byPnr = await postJson(
            `${BP_BASE}/v1/boardingpass`,
            androidHeaders,
            { RecordLocator: recordLocator, Email: DEFAULT_EMAIL },
            false
          );
          rawPasses.push(...byPnr);
          valid = dedupeValidPasses(rawPasses);
        } catch (err) {
          console.warn(`[PragaExt] /v1/boardingpass (${recordLocator}) falló:`, err);
        }
      }
    }
  }

  if (valid.length === 0) {
    if (bookingIds.length > 0) {
      throw new Error(
        `Se consultaron ${bookingIds.length} reserva(s), pero Ryanair aún no devolvió códigos de barras (¿falta completar el check-in de algún vuelo?).`
      );
    }
    throw new Error(
      "No se encontraron tarjetas de embarque con código de barras (verifica que hayas iniciado sesión y completado el check-in)."
    );
  }

  return valid;
}

async function sendToTab(tabId, message) {
  try {
    return await chrome.tabs.sendMessage(tabId, message);
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["bwip-js-min.js", "content.js"]
    });
    return await chrome.tabs.sendMessage(tabId, message);
  }
}

async function notifyTab(tabId, isRyanairTab, kind, text) {
  if (!isRyanairTab || !tabId) return;
  try {
    await sendToTab(tabId, { type: "showToast", kind, text });
  } catch (err) {
    console.warn("[PragaExt] No se pudo mostrar toast en pestaña:", err);
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab?.id;
  const onRyanair = isRyanairUrl(tab?.url);

  badge("…", "#0A3BA0");
  chrome.action.setTitle({ title: "Descargando tarjetas de embarque...", tabId });

  try {
    await notifyTab(tabId, onRyanair, "info", "⏳ Descargando tarjetas de embarque de Ryanair...");

    let pageCtx = { cid: null, pnr: null };
    if (onRyanair && tabId) {
      try {
        pageCtx = (await sendToTab(tabId, { type: "getPageContext" })) || pageCtx;
      } catch (err) {
        console.warn("[PragaExt] getPageContext falló:", err);
      }
    }

    const xAuthToken = await getSessionToken();
    const customerId = decodeCustomerId(xAuthToken) || pageCtx?.cid || null;

    if (!xAuthToken && !customerId) {
      throw new Error("Inicia sesión en ryanair.com primero.");
    }

    const validPasses = await fetchAllPasses(customerId, xAuthToken, pageCtx?.pnr);

    // 1. Descargar boarding-passes.json listo para la PWA
    const jsonPayload = {
      pnr: validPasses[0]?.pnr || pageCtx?.pnr || DEFAULT_PNR,
      generatedAt: new Date().toISOString(),
      passes: validPasses
    };
    const jsonBlobStr = JSON.stringify(jsonPayload, null, 2);
    const jsonDataUrl = "data:application/json;charset=utf-8," + encodeURIComponent(jsonBlobStr);
    await chrome.downloads.download({
      url: jsonDataUrl,
      filename: "boarding-passes.json",
      saveAs: false
    });

    // 2. Renderizar y descargar cada PNG Aztec si estamos en una pestaña de ryanair.com
    let pngCount = 0;
    if (onRyanair && tabId) {
      const rendered = await sendToTab(tabId, { type: "renderAztecBatch", passes: validPasses });
      if (rendered?.ok && Array.isArray(rendered.items)) {
        for (const item of rendered.items) {
          await sleep(150);
          await chrome.downloads.download({
            url: item.dataUrl,
            filename: item.filename,
            saveAs: false
          });
          pngCount++;
        }
      }
    }

    const countLabel = String(validPasses.length);
    badge(countLabel, "#1a7a34");
    const okMsg = pngCount > 0
      ? `✅ ¡${validPasses.length} tarjetas descargadas! Revisa tu carpeta Descargas (boarding-passes.json + ${pngCount} PNGs).`
      : `✅ ¡${validPasses.length} tarjetas guardadas en boarding-passes.json!`;
    chrome.action.setTitle({ title: okMsg, tabId });
    await notifyTab(tabId, onRyanair, "success", okMsg);
  } catch (err) {
    const reason = err?.message || String(err);
    console.error("[PragaExt] Error:", err);
    badge("!", "#c0262c");
    chrome.action.setTitle({ title: reason, tabId });
    await notifyTab(tabId, onRyanair, "error", `❌ Error: ${reason}`);
  }
});
