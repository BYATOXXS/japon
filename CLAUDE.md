# Viaje Japón 2026 — CLAUDE.md

> Actualizado: 2026-10-26. Lee esto ANTES de cualquier acción.

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
- 6 pestañas (barra inferior): Hoy, Ruta, Moverse, Sitios, Guía, SOS.
- "Hoy": antes del viaje muestra cuenta atrás + reservas pendientes; durante el viaje, el día actual. Tira con los 17 días para saltar a cualquiera, ← → y deslizar el dedo sobre la tarjeta. Cada día: datos rápidos (`HORARIO[fecha].clave`), "Hora a hora" (`HORARIO[fecha].pasos`) con un bloque de transporte antes de cada paso (línea, duración, precio por persona, dónde cogerlo, alternativa, taxi para 5 y ruta de Google Maps) y un banner "Ahora / Después" según la hora real. El plan original queda plegado como "Plan resumido". En Ruta es al revés (plan abierto, hora a hora plegado).
- "Presupuesto del día, por persona" en cada día (`PRESU_DIA`, en ¥): solo lo necesario (transporte en la opción barata recomendada sin taxis, desayuno, comida, cena y entradas del plan). No cuenta lo ya pagado (Disney, USJ, excursiones) ni caprichos (karaoke, galletas de ciervos, Premier/Express Pass, cangrejo). Muestra el total del viaje con ese mínimo (~147.000¥ ≈ 860€) y, el día en curso, lo apuntado en Mis gastos.
- `?hora=14:30` (junto con `?fecha=`) simula la hora para probar el banner "Ahora".
- "Moverse" (nueva, 2026-10-26): reglas de taxi siendo 5 (máx. 4 por taxi → 2 coches), calculadora de taxi por persona con las tarifas oficiales 2026 (`TAXI`), tabla rápida, Suica/ICOCA/tarjeta contactless (dónde vale y dónde no), pases (`PASES`), cómo leer Google Maps, normas, cada trayecto con opciones (`TRAYECTOS`, sustituye al antiguo `TRANSPORTE`) y envío de maletas.
- Maleta (Guía): la aerolínea solo deja MOCHILA en cabina + 1 maleta facturada de 25 kg. Estrategia: mochila a tope, maleta casi vacía para volver con compras. Plan recomendado: la noche del 5 nov, maleta de Tokio directa al Kyoto Tokyu (Kanazawa y Takayama solo con mochila).
- "Mis gastos": lo que queda, el gasto del día, los totales y cada gasto se ven en € y en ¥ (`eurYen`, al cambio del conversor).
- Sitios: cada sitio tiene "Mapa" y "🚇 Cómo llegar" (ruta en transporte público desde donde estés). "Cómo llegar" de los hoteles también es en transporte público.
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
- `index.html` — todo. Los DATOS están al principio del `<script>`: `HOTELES`, `SEGURO`, `DIAS`, `MOMENTOS`, `COMER`, `COMPRAS`, `ONSEN`, `FRASES`, `PRESUPUESTO`, `TRAYECTOS`, `PASES`, `TAXI`, `GEO`, `VISITAS`, `PREPARAR`, `HORARIO`, `PRESU_DIA`. En los textos de `HORARIO` se permite `<b>`. Si se añade un sitio nuevo, añadir también sus coordenadas en `GEO` (clave = su `q`). Para cambiar contenido, editar solo esos arrays.
- `sw.js` — caché offline. **Subir `VERSION` cada vez que se cambie algo** para que los móviles se actualicen.
- `og.png` (1200×630) — vista previa del enlace en WhatsApp. `icon*.png`, `icon.svg` — iconos de la app.

## Configuración crítica
- Las meta `og:image` / `og:url` apuntan a https://byatoxxs.github.io/japon/ — si cambia el repo o el usuario, actualizarlas.
- WhatsApp cachea la vista previa del enlace; tras cambiar `og.png` puede tardar en verse.
- Actualizaciones (arreglado el 2026-10-26): al volver a la app desde segundo plano el móvil no recarga la página. Por eso, en `visibilitychange` se llama a `reg.update()`; si hay `sw.js` nuevo (VERSION distinta) toma el control y la página se recarga sola (`controllerchange`). La navegación usa `cache: 'no-cache'` porque GitHub Pages manda `max-age=600`. Sin subir `VERSION`, los móviles NO se recargan solos.

## Decisiones tomadas
- El desayuno NO va incluido en ningún hotel (dicho por el usuario el 2026-10-26): en `PRESU_DIA` todos los días cuentan desayuno de konbini (~500¥).
- Tokio son 6 noches (31 oct – 6 nov), no 7: el original estaba mal contado. Total 15 noches.
- REGLA: el contenido debe conservar TODA la info del HTML original del usuario (auditado el 2026-10-20: 30 restaurantes, 28 tiendas, 7 onsen, todos los días y consejos). Solo se cambia lo que es incorrecto, y se dice qué se cambió.
- Día 8: se mantiene el plan original (bus a Takayama + excursión a Shirakawa-go). Parar en Shirakawa-go por el camino va solo como "alternativa" en una nota.
- Tax Free: desde el 1 nov 2026 es sistema de reembolso (se reclama en KIX antes de facturar). El 31 oct es el último día con descuento en caja.
- Correcciones verificadas respecto al original: edad para beber 20 años; Space Mountain cerrada hasta 2027; Fantasmic! → Believe! Sea of Dreams; USJ no permite comida de fuera (sí una bebida cerrada); USJ sin descuento por discapacidad confirmado para extranjeros; Kenroku-en 320¥ (no 800¥); bus Kanazawa→Takayama ~2 h 15 min; Kioto→Osaka JR ~30 min (15 min es en Shinkansen); Kioto→Hiroshima ~1 h 40 min; bus a Kegon ~45 min; Narita Express ~20€; pico de momiji en Kioto a finales de nov/inicio de dic (no 5–20 nov); Shinsaibashi no es la calle cubierta más larga de Japón; la iPhone/Tax Free directa solo el 31 oct; Disney abre normalmente a las 9:00.

- Precios verificados el 2026-10-26: taxi Tokio 500¥/1 km + 100¥/232 m (desde abril 2026), Kioto 500¥/0,9 km + 100¥/255 m, Osaka 600¥/1,2 km + 100¥/231 m, +20% de 22 a 5; Tokyo Subway Ticket 1.000/1.500/2.000¥; JR East mínimo 160¥; NIKKO PASS All Area 8.000¥ (no compensa) y World Heritage 3.000¥ (sí); bus Takayama↔Shirakawa-go 2.800¥ por trayecto (antes ponía 17€ "ida y vuelta": era un trayecto); Kanazawa→Takayama 3.400–4.000¥; ascensor de Kegon 550¥; Suica en Google Wallet NO funciona en Android de España (tarjeta física Welcome Suica o ICOCA); tarjeta contactless vale en metro de Tokio y Osaka, Keikyu, Nankai, Hankyu, Hanshin y Kintetsu, no en JR, Keisei ni Kioto.

## Pendientes
- Cuando el usuario pase los VUELOS: aeropuerto de llegada (Narita/Haneda) para el día 1, horas del día 15 nov (salida al aeropuerto), medidas y peso de la mochila de cabina.
- Rellenar en `HOTELES` el tipo de habitación reservada (`habitacion`) y el nº de reserva (`reserva`), y `SEGURO` (y subir `VERSION` en sw.js).
- Confirmar con Koto no Yume si aceptan tatuajes en el onsen.
- Verificar precios dudosos: tren Takayama→Kioto (39€ apuntado vs ~65€ reales con Shinkansen) y la excursión Hiroshima a 69€ (el Shinkansen ida y vuelta solo ya cuesta más).
- Confirmar aeropuerto de llegada (Narita vs Haneda) y horario exacto del vuelo.
