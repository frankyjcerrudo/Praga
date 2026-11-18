"use strict";

async function fingerprint() {
  const { fp } = await chrome.storage.local.get("fp");
  if (fp) return fp;
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  const hex = [...bytes].map(b => b.toString(16).padStart(2, "0")).join("");
  await chrome.storage.local.set({ fp: hex });
  return hex;
}

async function getToken(cid) {
  const tr = await fetch(`/api/usrprof/v2/accounts/${cid}/sessionToken`, {
    credentials: "include",
    headers: { "Accept": "application/json", "client": "desktop", "client-version": "0.162.0 (desktop)" }
  });
  if (!tr.ok) throw new Error(`sessionToken ${tr.status}: inicia sesión en ryanair.com primero`);
  return (await tr.json()).token;
}

async function resolveTrip() {
  const m = location.pathname.match(/\/trip\/manage\/([0-9a-f-]{36})/i);
  if (!m) throw new Error("No estás en la página de Gestionar Reserva (Manage Trip)");
  const tripId = m[1];

  const cid = sessionStorage.getItem("myRyanairID");
  if (!cid) throw new Error("No has iniciado sesión (falta myRyanairID)");

  const token = await getToken(cid);
  const r = await fetch(`/api/orders/v2/orders/${cid}/trips/${tripId}`, {
    credentials: "include",
    headers: { "Accept": "application/json", "X-AUTH-TOKEN": token, "client": "desktop", "client-version": "0.162.0 (desktop)" }
  });
  if (!r.ok) throw new Error(`trip ${r.status}`);
  const trip = await r.json();

  const flights = trip.flights || [];
  const bookingIds = [...new Set(flights.map(f => f.bookingId).filter(Boolean))];
  if (bookingIds.length === 0) throw new Error("No se encontraron vuelos en esta reserva");

  return { cid, bookingIds };
}

function passengerLabel(bp, idx) {
  const pax = bp.passenger;
  let raw = "";
  if (pax && typeof pax === "object") {
    raw = `${pax.firstName || ""}_${pax.lastName || ""}`.trim();
  } else if (typeof pax === "string") {
    raw = pax;
  }
  return (raw || `pax${idx + 1}`).replace(/[^a-zA-Z0-9_-]+/g, "_");
}

function fileName(bp, idx) {
  const pnr  = bp.pnr || "PNR";
  const dep  = bp.departure?.code || "";
  const arr  = bp.arrival?.code || "";
  const date = (bp.departure?.date || "").slice(0, 10).replace(/-/g, "");
  const seat = (bp.seat?.designator || "").trim();
  const pax  = passengerLabel(bp, idx);
  return `${pnr}_${dep}${arr}_${date}${seat ? "_" + seat : ""}_${pax}.png`;
}

function renderDataUrl(barcode) {
  const canvas = document.createElement("canvas");
  bwipjs.toCanvas(canvas, { bcid: "azteccode", text: barcode, scale: 8, padding: 4 });
  return canvas.toDataURL("image/png");
}

async function run() {
  const { cid, bookingIds } = await resolveTrip();
  const fp = await fingerprint();
  const token = await getToken(cid);
  const bp = await chrome.runtime.sendMessage({
    type: "fetchBoardingPasses",
    cid,
    bookingIds,
    token,
    fp
  });
  if (!bp?.ok) throw new Error(bp?.reason || "Error al descargar tarjetas");

  const validPasses = (bp.data || []).filter(item => item && item.barcode);
  if (validPasses.length === 0) {
    throw new Error("No hay códigos de barras todavía (¿has hecho ya el check-in?)");
  }

  const items = validPasses.map((pass, idx) => ({
    filename: fileName(pass, idx),
    dataUrl: renderDataUrl(pass.barcode)
  }));

  const jsonPayload = {
    pnr: validPasses[0]?.pnr || "B5Y4FQ",
    generatedAt: new Date().toISOString(),
    passes: validPasses
  };

  return { ok: true, items, jsonPayload };
}

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg === "run") {
    run().then(reply).catch(e => reply({ ok: false, reason: e.message || String(e) }));
    return true;
  }
});
