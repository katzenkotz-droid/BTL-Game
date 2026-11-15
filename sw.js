// BTL Service Worker – macht das Spiel offline spielbar.
// Bei jeder neuen Version die Nummer erhöhen, damit Handys das Update laden.
const CACHE = 'btl-v3.0';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Erst Netz – immer frisch bei GitHub nachfragen (no-cache), damit Updates sofort ankommen; offline aus dem Cache.
  e.respondWith(
    (new URL(e.request.url).origin === location.origin ? fetch(e.request.url, {cache: 'no-cache'}) : fetch(e.request)).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
