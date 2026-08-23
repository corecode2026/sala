// سلة بيت — Service Worker بسيط لدعم متطلبات تطبيق الويب التقدمي (PWA)
const CACHE_NAME = "sala-beit-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// شبكة أولاً، مع رجوع للنسخة المخزنة عند انقطاع الاتصال (إن وُجدت)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
