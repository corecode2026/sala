// سلة بيتك — Service Worker موحّد: يجمع بين دعم العمل بدون إنترنت (PWA) وإشعارات الطلبات (FCM)
// هذا الملف لازم يبقى بهذا الاسم بالضبط (firebase-messaging-sw.js) وبجذر الموقع (بجانب index.html)
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// انسخ نفس بيانات مشروعك من ملف supermarket-store.html (متغيّر FIREBASE_CONFIG) إذا غيّرته يومًا
firebase.initializeApp({
  apiKey: "AIzaSyBZkEZcOPB1xBeu6z8EfmUSsHrVzJqD5LU",
  authDomain: "supersala-3edb7.firebaseapp.com",
  projectId: "supersala-3edb7",
  storageBucket: "supersala-3edb7.firebasestorage.app",
  messagingSenderId: "358419771624",
  appId: "1:358419771624:web:4ef1a248152285af76595d",
});

const messaging = firebase.messaging();

// يظهر إشعارًا على الجهاز حتى لو الموقع مسكّر أو بالخلفية
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || "سلة بيتك";
  const body = (payload.notification && payload.notification.body) || "";
  self.registration.showNotification(title, {
    body,
    icon: "icon-192.png",
    badge: "icon-192.png",
  });
});

/* ============== دعم العمل بدون إنترنت (PWA) — نفس منطق sw.js السابق ============== */
const CACHE_NAME = "sala-beit-v1";

self.addEventListener("install", () => { self.skipWaiting(); });
self.addEventListener("activate", (event) => { event.waitUntil(self.clients.claim()); });

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
