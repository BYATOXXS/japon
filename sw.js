// Guarda la web en el móvil para que funcione sin internet.
// Sube VERSION cada vez que cambies index.html para forzar la actualización.
const VERSION = 'japon-v18';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', e => {
  // cache: 'reload' para no guardar copias viejas de la caché del navegador (GitHub Pages las guarda 10 min)
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Página: primero red, preguntando siempre al servidor (no-cache), y si no hay conexión, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
      .then(res => {
        // una navegación no acepta respuestas redirigidas: se reenvía al navegador como redirección normal
        if (res.redirected) return Response.redirect(res.url, 302);
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
        return res;
      })
      .catch(() => caches.match('./index.html')));
    return;
  }

  // Archivos propios y tipografías: copia guardada al instante, y se refresca en segundo plano
  if (url.origin === location.origin || url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
  // El resto (previsión del tiempo) va directo a la red; la web guarda la última previsión por su cuenta.
});
