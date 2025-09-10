// Enhanced offline cache with update prompt and fallback
const CACHE_NAME = "qc-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg",
  "./assets/icons/icon-512-maskable.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// Support skip waiting from client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Stale-while-revalidate with offline fallback page for navigation requests
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // For navigation requests (HTML), attempt network first, fallback to cache, then offline page
  if (req.mode === "navigate") {
    e.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const copy = fresh.clone();
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, copy);
          return fresh;
        } catch (_) {
          const cached = await caches.match(req);
          return (
            cached || (await caches.match("./offline.html")) || Response.error()
          );
        }
      })()
    );
    return;
  }

  // For other GETs: stale-while-revalidate
  e.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
