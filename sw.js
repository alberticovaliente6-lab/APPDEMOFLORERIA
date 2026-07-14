const CACHE = "floreria-fast-v1";
const SHELL = ["./","./index.html","./config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE ? caches.delete(k) : Promise.resolve()))).then(()=>self.clients.claim())));
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.hostname.includes("script.google.com") || url.hostname.includes("googleusercontent.com")) return;
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
