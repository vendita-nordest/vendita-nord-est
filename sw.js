// Vendita Nord Est 2.0: prima prova internet (così gli aggiornamenti arrivano subito), se manca usa la copia salvata.
// Salva solo i file dell'app, mai i dati.
const CACHE='vne-2.6';const SHELL=['./','index.html','config.js','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('vne-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!='GET'||u.origin!=location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request)))});
