# Viaje Japón 2026 — CLAUDE.md

> Actualizado: 2026-10-20. Lee esto ANTES de cualquier acción.

## Qué es este proyecto
Web-app (PWA) del viaje a Japón de Eric y 4 amigos (30 oct – 15 nov 2026) para consultar desde el móvil.
Se comparte por WhatsApp con el enlace de GitHub Pages y funciona sin internet una vez abierta.

## Stack técnico
- HTML + CSS + JS vanilla en un único `index.html`, sin build ni dependencias.
- Service worker (`sw.js`) para uso offline + `manifest.webmanifest` para instalar en la pantalla de inicio.
- Tipografía: Shippori Mincho (Google Fonts) para títulos; fuente del sistema para el texto.
- Previsión del tiempo: Open-Meteo (sin clave), solo cuando faltan ≤15 días para cada día.
- Hosting: GitHub Pages, repo `BYATOXXS/japon` (rama `main`, raíz) → https://byatoxxs.github.io/japon/

## Estado actual
- 5 pestañas (barra inferior): Hoy, Ruta, Sitios, Guía, SOS.
- "Hoy": antes del viaje muestra cuenta atrás + reservas pendientes; durante el viaje, el plan del día con ← →.
- Casillas (reservas, maleta, 48 h) y cambio €/¥ se guardan en localStorage de cada móvil (no se comparten entre amigos).
- `?fecha=2026-11-07` en la URL simula un día concreto (para probar).
- Enlace directo a un día: `#ruta/2026-11-03`. Secciones de guía: `#guia/gastos`, `#guia/reservas`, `#guia/48h`, `#guia/pwa`.
- Precios en ¥ muestran "≈X€" automáticamente (`withEur`, usa el cambio del conversor, por defecto 170).
- "Mis gastos" (Guía): apuntador local con presupuesto (por defecto 1.100€), lo que queda y cuánto se puede gastar al día. No se comparte; para el grupo, Tricount.
- "Cerca de mí" (Sitios): ordena por distancia con el GPS usando `GEO` (coordenadas de OpenStreetMap; las marcadas con 1 son zona aproximada; Kutani sin ubicación).
- Paradas con horario y precio (`VISITAS`, comprobado en oct 2026) y "Antes de salir" / "Para mañana" (`PREPARAR`).
- Frases con audio (speechSynthesis ja-JP; si el móvil no tiene voz japonesa, avisa).
- Hoteles (investigados el 2026-10-22, webs oficiales + webs de reservas): Metropolitan Edmont (Iidabashi), Hotel Kanazawa (ホテル金沢, salida Este de la estación), Oyado Koto no Yume (ryokan, Takayama; cierra la puerta a las 23:00 y check-out a las 10:00), Kyoto Tokyu (lanzadera gratis desde Kyoto Hachijo), Monterey Grasmere Osaka (JR Namba, junto a OCAT). Ficha completa en Ruta → "Dónde dormimos" (`#ruta/hotel-<id>`), tarjeta "Esta noche dormís en" en Hoy y datos rápidos en SOS. Cada hotel es también parada en su día de llegada.
- Quitado el botón "Enviar por WhatsApp" de los días: el usuario lo considera innecesario (todos tienen la web y viajan juntos).

## Archivos clave
- `index.html` — todo. Los DATOS están al principio del `<script>`: `HOTELES`, `SEGURO`, `DIAS`, `MOMENTOS`, `COMER`, `COMPRAS`, `ONSEN`, `FRASES`, `PRESUPUESTO`, `TRANSPORTE`, `GEO`, `VISITAS`, `PREPARAR`. Si se añade un sitio nuevo, añadir también sus coordenadas en `GEO` (clave = su `q`). Para cambiar contenido, editar solo esos arrays.
- `sw.js` — caché offline. **Subir `VERSION` cada vez que se cambie algo** para que los móviles se actualicen.
- `og.png` (1200×630) — vista previa del enlace en WhatsApp. `icon*.png`, `icon.svg` — iconos de la app.

## Configuración crítica
- Las meta `og:image` / `og:url` apuntan a https://byatoxxs.github.io/japon/ — si cambia el repo o el usuario, actualizarlas.
- WhatsApp cachea la vista previa del enlace; tras cambiar `og.png` puede tardar en verse.

## Decisiones tomadas
- Tokio son 6 noches (31 oct – 6 nov), no 7: el original estaba mal contado. Total 15 noches.
- REGLA: el contenido debe conservar TODA la info del HTML original del usuario (auditado el 2026-10-20: 30 restaurantes, 28 tiendas, 7 onsen, todos los días y consejos). Solo se cambia lo que es incorrecto, y se dice qué se cambió.
- Día 8: se mantiene el plan original (bus a Takayama + excursión a Shirakawa-go). Parar en Shirakawa-go por el camino va solo como "alternativa" en una nota.
- Tax Free: desde el 1 nov 2026 es sistema de reembolso (se reclama en KIX antes de facturar). El 31 oct es el último día con descuento en caja.
- Correcciones verificadas respecto al original: edad para beber 20 años; Space Mountain cerrada hasta 2027; Fantasmic! → Believe! Sea of Dreams; USJ no permite comida de fuera (sí una bebida cerrada); USJ sin descuento por discapacidad confirmado para extranjeros; Kenroku-en 320¥ (no 800¥); bus Kanazawa→Takayama ~2 h 15 min; Kioto→Osaka JR ~30 min (15 min es en Shinkansen); Kioto→Hiroshima ~1 h 40 min; bus a Kegon ~45 min; Narita Express ~20€; pico de momiji en Kioto a finales de nov/inicio de dic (no 5–20 nov); Shinsaibashi no es la calle cubierta más larga de Japón; la iPhone/Tax Free directa solo el 31 oct; Disney abre normalmente a las 9:00.

## Pendientes
- Rellenar en `HOTELES` el tipo de habitación reservada (`habitacion`) y el nº de reserva (`reserva`), y `SEGURO` (y subir `VERSION` en sw.js).
- Confirmar con Koto no Yume si aceptan tatuajes en el onsen y la hora exacta del desayuno.
- Verificar precios dudosos: tren Takayama→Kioto (39€ apuntado vs ~65€ reales con Shinkansen) y la excursión Hiroshima a 69€ (el Shinkansen ida y vuelta solo ya cuesta más).
- Confirmar aeropuerto de llegada (Narita vs Haneda) y horario exacto del vuelo.
