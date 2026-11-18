"use strict";

const BP_URL  = "https://mntappbp.ryanair.com/v1/boardingpasses";
const APP_VER = "3.243.0";

function badge(text, color) {
  chrome.action.setBadgeText({ text });
  if (color) chrome.action.setBadgeBackgroundColor({ color });
}

// Only this worker is exempt from CORS here, via host_permissions.
chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg?.type !== "fetchBoardingPasses") return;
  (async () => {
    try {
      const bookingIds = Array.isArray(msg.bookingIds)
        ? msg.bookingIds.map(Number).filter(n => !Number.isNaN(n))
        : [Number(msg.bookingId)];

      const r = await fetch(BP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": msg.token,
          "client": "android",
          "client-os": "34",
          "client-version": APP_VER,
          "client-carrier-code": "FR",
          "X-DEVICE-FINGERPRINT": msg.fp
        },
        body: JSON.stringify({ CustomerId: msg.cid, BookingIds: bookingIds })
      });
      if (!r.ok) {
        reply({ ok: false, reason: `boarding pass ${r.status}: ${(await r.text()).slice(0, 120)}` });
        return;
      }
      const data = await r.json();
      const list = Array.isArray(data) ? data : [data];
      reply({ ok: true, data: list });
    } catch (e) {
      reply({ ok: false, reason: e.message || String(e) });
    }
  })();
  return true;
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id || !/^https:\/\/www\.ryanair\.com\/.*\/trip\/manage\//.test(tab.url || "")) {
    badge("!", "#c0262c");
    chrome.action.setTitle({ title: "Abre primero tu reserva (Manage Trip) en ryanair.com", tabId: tab?.id });
    return;
  }

  badge("…", "#0A3BA0");
  try {
    const result = await chrome.tabs.sendMessage(tab.id, "run");
    if (!result?.ok) {
      badge("!", "#c0262c");
      chrome.action.setTitle({ title: result?.reason || "Error", tabId: tab.id });
      return;
    }

    // 1. Download JSON ready for Praga PWA / boarding-passes.json
    const jsonBlobStr = JSON.stringify(result.jsonPayload, null, 2);
    const jsonDataUrl = "data:application/json;charset=utf-8," + encodeURIComponent(jsonBlobStr);
    await chrome.downloads.download({
      url: jsonDataUrl,
      filename: "boarding-passes.json",
      saveAs: false
    });

    // 2. Download individual Aztec PNGs for each passenger & flight
    for (const item of result.items) {
      await chrome.downloads.download({
        url: item.dataUrl,
        filename: item.filename,
        saveAs: false
      });
    }

    badge(String(result.items.length), "#1a7a34");
    chrome.action.setTitle({ title: `Descargadas ${result.items.length} tarjetas + boarding-passes.json`, tabId: tab.id });
  } catch (e) {
    badge("!", "#c0262c");
    chrome.action.setTitle({ title: String(e.message || e), tabId: tab.id });
  }
});
