"use strict";

if (!window.__pragaRyanairExtLoaded) {
  window.__pragaRyanairExtLoaded = true;

  const TOAST_COLORS = {
    info: { bg: "#073590", border: "#3b82f6", text: "#ffffff" },
    success: { bg: "#14532d", border: "#22c55e", text: "#ffffff" },
    error: { bg: "#7f1d1d", border: "#ef4444", text: "#ffffff" }
  };

  function parseBcbpQuick(barcode) {
    if (typeof barcode !== "string" || !barcode.startsWith("M") || barcode.length < 58) {
      return {};
    }
    return {
      rawName: barcode.slice(2, 22).trim(),
      pnr: barcode.slice(23, 30).trim(),
      origin: barcode.slice(30, 33).trim(),
      destination: barcode.slice(33, 36).trim(),
      flightNo: `${barcode.slice(36, 39).trim()}${barcode.slice(39, 44).trim()}`.replace(/\s+/g, ""),
      seat: barcode.slice(48, 52).replace(/^0+/, "").trim()
    };
  }

  function extractPnrFromPage() {
    const text = document.body?.innerText || "";
    const m = text.match(/(?:N[úu]mero de reserva|Reservation number|Booking reference)\s*:\s*([A-Z0-9]{6})/i);
    return m ? m[1].toUpperCase() : null;
  }

  function passengerLabel(bp, bcbp, idx) {
    let raw = "";
    if (bp.name && typeof bp.name === "object") {
      raw = `${bp.name.first || ""}_${bp.name.last || ""}`.trim();
    } else if (bp.passenger && typeof bp.passenger === "object") {
      raw = `${bp.passenger.firstName || ""}_${bp.passenger.lastName || ""}`.trim();
    } else if (typeof bp.passenger === "string") {
      raw = bp.passenger;
    } else if (bcbp.rawName) {
      raw = bcbp.rawName.replace("/", "_");
    }
    return (raw || `pax${idx + 1}`)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .replace(/^_+|_+$/g, "") || `pax${idx + 1}`;
  }

  function buildFileName(bp, idx) {
    const bcbp = parseBcbpQuick(bp.barcode);
    const pnr = bp.pnr || bcbp.pnr || "PNR";
    const dep = bp.departure?.code || bcbp.origin || "";
    const arr = bp.arrival?.code || bcbp.destination || "";
    const date = (bp.departure?.date || "").slice(0, 10).replace(/-/g, "");
    const flight = (bp.flight?.label || `${bp.flight?.carrierCode || ""}${bp.flight?.number || ""}` || bp.flightNumber || bcbp.flightNo || "").replace(/\s+/g, "");
    const seat = (bp.seat?.designator || bcbp.seat || (bp.paxType === "INF" ? "INF" : "")).trim();
    const pax = passengerLabel(bp, bcbp, idx);

    return [
      pnr,
      dep && arr ? `${dep}${arr}` : (dep || arr),
      flight,
      date,
      seat,
      pax
    ].filter(Boolean).join("_") + ".png";
  }

  function renderDataUrl(barcode) {
    const canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, { bcid: "azteccode", text: barcode, scale: 8, padding: 4 });
    return canvas.toDataURL("image/png");
  }

  function showToast(kind, text) {
    const palette = TOAST_COLORS[kind] || TOAST_COLORS.info;
    let el = document.getElementById("praga-ext-toast");

    if (!el) {
      el = document.createElement("div");
      el.id = "praga-ext-toast";
      el.style.cssText = [
        "position: fixed",
        "top: 16px",
        "right: 16px",
        "z-index: 2147483647",
        "max-width: 380px",
        "padding: 12px 14px",
        "border-radius: 10px",
        "box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35)",
        "font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        "font-size: 13.5px",
        "line-height: 1.4",
        "font-weight: 600",
        "display: flex",
        "align-items: flex-start",
        "gap: 10px"
      ].join("; ");
      document.documentElement.appendChild(el);
    }

    el.style.background = palette.bg;
    el.style.border = `2px solid ${palette.border}`;
    el.style.color = palette.text;
    el.innerHTML = "";

    const msgSpan = document.createElement("span");
    msgSpan.style.flex = "1";
    msgSpan.textContent = text;

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "✕";
    closeBtn.setAttribute("aria-label", "Cerrar aviso");
    closeBtn.style.cssText = [
      "background: transparent",
      "border: none",
      "color: inherit",
      "cursor: pointer",
      "font-size: 14px",
      "font-weight: 700",
      "padding: 0 2px",
      "line-height: 1",
      "opacity: 0.85"
    ].join("; ");
    closeBtn.addEventListener("click", () => el.remove());

    el.appendChild(msgSpan);
    el.appendChild(closeBtn);
  }

  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (msg?.type === "getPageContext") {
      let cid = null;
      try {
        cid = sessionStorage.getItem("myRyanairID");
      } catch {
        cid = null;
      }
      reply({ cid, pnr: extractPnrFromPage() });
      return false;
    }

    if (msg?.type === "renderAztecBatch") {
      try {
        const passes = Array.isArray(msg.passes) ? msg.passes : [];
        const items = passes
          .filter(bp => bp && typeof bp.barcode === "string" && bp.barcode.trim())
          .map((bp, idx) => ({
            filename: buildFileName(bp, idx),
            dataUrl: renderDataUrl(bp.barcode.trim())
          }));
        reply({ ok: true, items });
      } catch (err) {
        reply({ ok: false, reason: err?.message || String(err) });
      }
      return false;
    }

    if (msg?.type === "showToast") {
      showToast(msg.kind, msg.text || "");
      reply({ ok: true });
      return false;
    }

    return false;
  });
}
