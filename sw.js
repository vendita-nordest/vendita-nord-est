// Vendita Nord Est: permette l'installazione e l'apertura anche con rete debole.
// Prima prova internet (così gli aggiornamenti arrivano subito), se manca usa la copia salvata.
// Non salva MAI i dati: solo i file dell'app.
const CACHE = 'vne-1.0.0';
const SHELL = ['./', 'index.html', 'app.css', 'app.js', 'parse-worker.js', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request).then((r) => r || caches.match('index.html'))));
});
