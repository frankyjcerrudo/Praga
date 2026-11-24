"""Fetch all Ryanair boarding passes for a booking (all 7 family passengers)
and save them directly to ../boarding-passes.json for the Praga PWA.

Based on bigtajine/no-ryanair-app. Uses only the Python standard library
unless --png is requested (which requires playwright + chromium).

Usage examples:
  # Using X-AUTH-TOKEN:
  python tools/fetch_passes.py --token "<X-AUTH-TOKEN>"

  # Using browser cookie + myRyanair customer ID:
  python tools/fetch_passes.py --cookie-file cookie.txt --customer-id "<ID>"
"""
import argparse
import datetime
import hashlib
import json
import pathlib
import sys
import urllib.error
import urllib.request

BASE = "https://mntappbp.ryanair.com"
USRPROF = "https://www.ryanair.com/api/usrprof/v2/accounts"
APP_VERSION = "3.243.0"

DEFAULT_PNR = "B5Y4FQ"
DEFAULT_EMAIL = "fjcerrudo@gmail.com"
DEFAULT_OUT_JSON = pathlib.Path(__file__).resolve().parent.parent / "boarding-passes.json"

_DEVICE_FINGERPRINT = hashlib.sha1(b"praga-familia-client-00000001").hexdigest()


def refresh_token(customer_id: str, session_cookie: str) -> str:
    """Exchange a web SESSION_COOKIE for a fresh X-AUTH-TOKEN."""
    req = urllib.request.Request(
        f"{USRPROF}/{customer_id}/sessionToken",
        headers={
            "Accept": "application/json, text/plain, */*",
            "client": "desktop",
            "client-version": "0.162.0 (desktop)",
            "Cookie": session_cookie.encode("latin-1", errors="replace").decode("latin-1"),
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            print("[refresh] X-AUTH-TOKEN obtenido correctamente.", file=sys.stderr)
            return data["token"]
    except urllib.error.HTTPError as e:
        print(f"[refresh] HTTP {e.code}: {e.read().decode(errors='replace')}", file=sys.stderr)
        raise


def post(path: str, token: str, body: dict):
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=json.dumps(body).encode(),
        method="POST",
        headers={
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
            "client": "android",
            "client-os": "34",
            "client-version": APP_VERSION,
            "client-carrier-code": "FR",
            "User-Agent": f"RyanAir/{APP_VERSION} (Android)",
            "X-DEVICE-FINGERPRINT": _DEVICE_FINGERPRINT,
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode(errors='replace')}", file=sys.stderr)
        raise


def get_boarding_passes_for_flight(token: str, pnr: str, email: str) -> list:
    data = post("/v1/boardingpass", token, {"RecordLocator": pnr, "Email": email})
    return data if isinstance(data, list) else [data]


def render_pngs(passes: list, out_dir: pathlib.Path) -> None:
    """Optional: render Aztec PNGs using Playwright + local vendor/bwip-js-min.js."""
    from playwright.sync_api import sync_playwright

    bwip_path = pathlib.Path(__file__).resolve().parent.parent / "vendor" / "bwip-js-min.js"
    if not bwip_path.exists():
        raise FileNotFoundError(f"No se encuentra {bwip_path}")
    bwip_js = bwip_path.read_text(encoding="utf-8")

    out_dir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_content("<html><body><canvas id='c'></canvas></body></html>")
        page.add_script_tag(content=bwip_js)

        for idx, bp in enumerate(passes, start=1):
            barcode = bp.get("barcode")
            if not barcode:
                continue
            pnr = bp.get("pnr", DEFAULT_PNR)
            dep = (bp.get("departure") or {}).get("code", "")
            arr = (bp.get("arrival") or {}).get("code", "")
            name_obj = bp.get("name")
            pax = bp.get("passenger")
            if isinstance(name_obj, dict):
                name = f"{name_obj.get('first', '')}_{name_obj.get('last', '')}".strip("_")
            elif isinstance(pax, dict):
                name = f"{pax.get('firstName', '')}_{pax.get('lastName', '')}".strip("_")
            elif pax:
                name = str(pax)
            else:
                name = ""
            safe_name = "".join(c if c.isalnum() or c in "-_" else "_" for c in name) or f"pax{idx}"
            seat_obj = bp.get("seat")
            seat = (seat_obj.get("designator") if isinstance(seat_obj, dict) else "") or ""
            seat = seat.strip()
            if not seat and bp.get("paxType") == "INF":
                seat = "INF"
            out_file = out_dir / f"{pnr}_{dep}{arr}_{seat}_{safe_name}.png"

            page.evaluate(
                """(barcode) => {
                    bwipjs.toCanvas(document.getElementById('c'), {
                        bcid: 'azteccode',
                        text: barcode,
                        scale: 8,
                        padding: 4
                    });
                }""",
                barcode,
            )
            page.locator("#c").screenshot(path=str(out_file))
            print(f"[png] Guardado: {out_file}", file=sys.stderr)

        browser.close()


def main():
    ap = argparse.ArgumentParser(description="Extrae todas las tarjetas de embarque de Ryanair para la PWA de Praga.")
    group = ap.add_mutually_exclusive_group(required=True)
    group.add_argument("--token", help="X-AUTH-TOKEN obtenido de Ryanair")
    group.add_argument("--cookie", help="Cookie string del navegador")
    group.add_argument("--cookie-file", help="Archivo con la cookie del navegador")
    ap.add_argument("--customer-id", help="myRyanair customer ID (requerido con --cookie/--cookie-file)")
    ap.add_argument("--pnr", default=DEFAULT_PNR, help=f"Localizador (por defecto: {DEFAULT_PNR})")
    ap.add_argument("--email", default=DEFAULT_EMAIL, help=f"Email reserva (por defecto: {DEFAULT_EMAIL})")
    ap.add_argument("--out-json", default=str(DEFAULT_OUT_JSON), help="Ruta del JSON de salida para la PWA")
    ap.add_argument("--png", action="store_true", help="Generar además PNGs Aztec en tools/pngs/ (requiere playwright)")
    args = ap.parse_args()

    if args.cookie or args.cookie_file:
        if not args.customer_id:
            ap.error("--customer-id es obligatorio cuando usas --cookie o --cookie-file")
        cookie = args.cookie or pathlib.Path(args.cookie_file).read_text(encoding="utf-8").strip()
        token = refresh_token(args.customer_id, cookie)
    else:
        token = args.token

    passes = get_boarding_passes_for_flight(token, args.pnr, args.email)
    valid_passes = [bp for bp in passes if isinstance(bp, dict) and bp.get("barcode")]
    print(f"[ok] Recibidas {len(valid_passes)} tarjetas con código de barras para {args.pnr}.", file=sys.stderr)

    payload = {
        "pnr": args.pnr,
        "generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "passes": valid_passes,
    }
    out_path = pathlib.Path(args.out_json)
    out_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[ok] JSON guardado en: {out_path}", file=sys.stderr)

    if args.png and valid_passes:
        render_pngs(valid_passes, pathlib.Path(__file__).resolve().parent / "pngs")


if __name__ == "__main__":
    main()
