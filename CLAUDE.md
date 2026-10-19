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
- Enlace directo a un día: `#ruta/2026-11-03`. Secciones de guía: `#guia/reservas`, `#guia/48h`, `#guia/pwa`.

## Archivos clave
- `index.html` — todo. Los DATOS están al principio del `<script>`: `HOTELES`, `SEGURO`, `DIAS`, `COMER`, `COMPRAS`, `ONSEN`, `FRASES`, `PRESUPUESTO`, `TRANSPORTE`. Para cambiar contenido, editar solo esos arrays.
- `sw.js` — caché offline. **Subir `VERSION` cada vez que se cambie algo** para que los móviles se actualicen.
- `og.png` (1200×630) — vista previa del enlace en WhatsApp. `icon*.png`, `icon.svg` — iconos de la app.

## Configuración crítica
- Las meta `og:image` / `og:url` apuntan a https://byatoxxs.github.io/japon/ — si cambia el repo o el usuario, actualizarlas.
- WhatsApp cachea la vista previa del enlace; tras cambiar `og.png` puede tardar en verse.

## Decisiones tomadas
- Tokio son 6 noches (31 oct – 6 nov), no 7: el original estaba mal contado. Total 15 noches.
- Día 8: se propone parar en Shirakawa-go en el bus Kanazawa → Takayama (en vez de ida y vuelta desde Takayama); los mercados de Takayama pasan a la mañana del día 9.
- Tax Free: desde el 1 nov 2026 es sistema de reembolso (se reclama en KIX antes de facturar). El 31 oct es el último día con descuento en caja.
- Correcciones respecto al original: edad para beber 20 años; Space Mountain cerrada; Fantasmic! sustituido por Believe! Sea of Dreams; USJ no permite comida de fuera; Kioto→Osaka 30 min; bus a Kegon ~45 min.

## Pendientes
- Rellenar `HOTELES` y `SEGURO` cuando estén reservados (y subir `VERSION` en sw.js).
- Verificar precios dudosos: tren Takayama→Kioto (39€ apuntado vs ~65€ reales con Shinkansen) y la excursión Hiroshima a 69€ (el Shinkansen ida y vuelta solo ya cuesta más).
- Confirmar aeropuerto de llegada (Narita vs Haneda) y horario exacto del vuelo.
