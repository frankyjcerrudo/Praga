# 🏰 Praga en Familia - Planificador & Guía de Viaje PWA

Una aplicación web progresiva (**PWA**) ultra ligera, diseñada específicamente para teléfonos móviles Android (y iPhone), creada para planificar y disfrutar al máximo de un viaje a Praga en familia.

Funciona **100% offline** (en el avión, en el metro o sin cobertura) y no requiere instalar ninguna tienda de aplicaciones ni compilar código complejo.

---

## 📱 Características Principales

1. **📅 Itinerario Día a Día Adaptado a Familias**:
   - **Día 1**: Casco Histórico (Staré Město), Reloj Astronómico, Barrio Judío y parada para degustar *Trdelník*.
   - **Día 2**: Castillo de Praga (subida en el Tranvía 22), Callejón del Oro, Cambio de guardia, Muro de John Lennon y Puente de Carlos.
   - **Día 3**: Funicular a la Colina Petřín, Torre panorámica, Laberinto de Espejos, Parque Infantil fluvial (*Dětský Ostrov*) y paseo en barco por el río Moldava.
   - **Día 4**: Fortaleza de Vyšehrad, Casa Danzante y compras de recuerdos familiares en la juguetería Hamleys y Wenceslao.
   - Posibilidad de **marcar actividades como completadas** y **añadir paradas personalizadas**.
   - Botón directo de **"Abrir en Google Maps"** en cada parada.

2. **📍 Lugares de Interés y Filtros**:
   - Buscador rápido y filtros por categoría (*⭐ Imprescindibles*, *👶 Ideal Niños*, *🏰 Castillo*, *🌆 Miradores*).
   - Fichas detalladas con nombres en checo, consejos de acceso con carritos de bebé y horarios idóneos.

3. **💡 Guía Práctica & Herramientas Offline**:
   - **Conversor de moneda interactivo CZK ↔ EUR** con atajos rápidos de precio y tasa de cambio ajustable.
   - **Guía de transporte público**: Billetes de 30m/90m/24h/72h y **normativa gratuita para niños** (menores de 6 años gratis, niños de 6 a 15 gratis con acreditación de edad).
   - **Consejos para evitar timos**: Cajeros fraudulentos Euronet, taxis y baños limpios recomendados.
   - **Diccionario Checo indispensable con síntesis de voz nativa**: Toca el altavoz para escuchar la pronunciación correcta de palabras clave (*Děkuji*, *Prosím*, *Zmrzlina*...).

4. **🏨 Gestor de Reservas y Documentos**:
   - Ficha del Hotel/Apartamento con botones directos de **"Llamar al Hotel"** y **"Cómo llegar en Google Maps"**.
   - Información de vuelos y traslados desde el aeropuerto Václav Havel (Bus 119 + Metro A, o Bolt/Uber).
   - Botón de **Llamada de Emergencia al 112** y datos de la **Embajada de España en Praga**.
   - **Copia de seguridad y sincronización familiar**: Exporta e importa el viaje en formato `.json` para pasarlo a otros móviles por WhatsApp.

5. **✅ Checklist de Equipaje Familiar**:
   - Lista organizada por categorías: Documentos, Salud/Botiquín, Ropa/Calzado, Tecnología, Especial Niños.
   - Barra de progreso visual interactiva.
   - Posibilidad de añadir nuevas cosas con 1 clic.

---

## 🚀 Cómo Probarla Localmente en tu Ordenador

Simplemente haz doble clic sobre el archivo `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox).

> **Consejo para probar la vista móvil en el PC**:
> Presiona `F12` en Chrome o Edge y haz clic en el icono de dispositivo móvil (**Toggle device toolbar** o `Ctrl+Shift+M`) para visualizarla con la proporción exacta de una pantalla de móvil.

---

## 📲 Cómo Instalarla en tu Móvil Android (PWA)

Una vez subida a un servidor web o servicio gratuito con HTTPS (ver opciones abajo):

1. Abre la URL en **Google Chrome** en tu teléfono Android.
2. Verás un botón en la cabecera que dice **"Instalar"**, o bien pulsa en el menú de Chrome (los **tres puntos verticales** arriba a la derecha).
3. Selecciona **"Añadir a pantalla de inicio"** o **"Instalar aplicación"**.
4. ¡Listo! Se creará un icono propio con el escudo de Praga en tu pantalla de aplicaciones, se abrirá a pantalla completa (sin barra del navegador) y funcionará perfectamente sin conexión a internet.

---

## 🌐 Cómo Publicarla Gratis para Compartirla con la Familia

Puedes subir estos 5 archivos (`index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js` y la carpeta `icons/`) en cualquiera de estas opciones gratuitas en menos de 2 minutos:

### Opción 1: GitHub Pages (Recomendada)
1. Crea un repositorio en GitHub (ej. `praga-familia`).
2. Sube estos archivos.
3. En **Settings > Pages**, activa GitHub Pages seleccionando la rama `main` y la carpeta `root`.
4. En 1 minuto tendrás una URL como `https://tu-usuario.github.io/praga-familia/` lista para compartir con todos.

### Opción 2: Netlify Drop / Vercel
- En [app.netlify.com/drop](https://app.netlify.com/drop), arrastra directamente la carpeta `Praga` y te dará una URL HTTPS al instante.
