# Extensión Chrome: Praga Familia - Tarjetas Ryanair (Sin App)

Basada en [`bigtajine/no-ryanair-app`](https://github.com/bigtajine/no-ryanair-app), adaptada para descargar **de una sola vez** las tarjetas de embarque de los **7 pasajeros** de vuestra reserva (`B5Y4FQ`).

## Cómo instalarla en Chrome / Edge
1. Abre `chrome://extensions` (o `edge://extensions`).
2. Activa el **Modo de desarrollador** (arriba a la derecha).
3. Pulsa **Cargar descomprimida** (*Load unpacked*) y selecciona esta carpeta: `C:\Repos\Praga\ryanair-extension`.

## Cómo usarla cuando hagáis el Check-in
1. Inicia sesión en [ryanair.com](https://www.ryanair.com) y haz el check-in de la reserva **`B5Y4FQ`**.
2. Entra en **Gestionar reserva** (*Manage Trip* — la URL debe contener `/trip/manage/...`).
3. Pulsa el icono de la extensión en la barra del navegador.
4. En segundos se descargarán en tu carpeta `Descargas`:
   - `boarding-passes.json` → Cópialo en `C:\Repos\Praga\boarding-passes.json` y haz `git push` (para que se sincronice automáticamente en el móvil de toda la familia), **o** impórtalo directamente desde el botón **"📥 Importar Ryanair"** de la PWA.
   - Los archivos `.png` individuales con el código Aztec de cada viajero.
