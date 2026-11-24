# Extensión Chrome / Edge: Praga Familia - Tarjetas Ryanair (Sin App)

Basada en [`bigtajine/no-ryanair-app`](https://github.com/bigtajine/no-ryanair-app) y [`Ax6/ryanquack`](https://github.com/Ax6/ryanquack), adaptada para descargar **de una sola vez** las tarjetas de embarque de los **7 pasajeros** de vuestra reserva (`B5Y4FQ`).

## Cómo instalarla o actualizarla en Edge / Chrome
1. Abre `edge://extensions` (o `chrome://extensions`).
2. Activa el **Modo de desarrollador**.
3. Si es la primera vez: pulsa **Cargar desempaquetado** / **Cargar descomprimida** y selecciona la carpeta `C:\Repos\Praga\ryanair-extension`.
4. **Si ya la tenías instalada:** pulsa **Volver a cargar (🔄)** en la tarjeta de la extensión para aplicar los últimos cambios.

## Cómo usarla cuando hagáis el Check-in
1. Inicia sesión en [ryanair.com](https://www.ryanair.com) y haz el check-in de la reserva **`B5Y4FQ`**.
2. Desde **cualquier página** de `ryanair.com` (incluida la vista de gestionar reserva con URL `TripBasedOnFlightId:...`), pulsa el icono de la extensión en la barra del navegador.
3. Verás un aviso flotante en la esquina superior derecha indicando el progreso o cualquier error exacto.
4. En segundos se descargarán en tu carpeta `Descargas`:
   - `boarding-passes.json` → Cópialo en `C:\Repos\Praga\boarding-passes.json` y haz `git push` (para que se sincronice automáticamente en el móvil de toda la familia), **o** impórtalo directamente desde el botón **"📥 Importar Ryanair"** de la PWA.
   - Los archivos `.png` individuales con el código Aztec de cada viajero.
