// 📁 Filename: service-worker.js

const CACHE_NAME = "learn-with-fun-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/learn.html",
  "/game.html",
  "/music.html",
  "/manifest.json",
  "/styles/main.css",
  "/sounds/hello.mp3",
  "/icon-192.png",
  "/icon-512.png"
  // Optionally add all image and sound assets like:
  // "/images/apple.png",
  // "/sounds/a-apple.mp3",
];

// Install event: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve from cache if available
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});
