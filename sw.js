/* ============================================
   SERVICE WORKER — Offline-Caching
   ============================================ */

const CACHE_NAME = 'kartendeck-v1';

/* Alle Dateien die gecacht werden sollen.
   Wenn du Kartenbilder hast, füge hier die Pfade hinzu!
   z.B.: 'cards/2_pik.png', 'cards/3_pik.png', ... */
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './cards/C/C-1.png',
  './cards/C/C-2.png',
  './cards/C/C-3.png',
  './cards/C/C-4.png',
  './cards/C/C-5.png',
  './cards/C/C-6.png',
  './cards/C/C-7.png',
  './cards/C/C-8.png',
  './cards/C/C-9.png',
  './cards/C/C-10.png',
  './cards/C/C-Bube.png',
  './cards/C/C-Dame.png',
  './cards/C/C-König.png',
  './cards/C/C-Ass.png',
  './cards/P/P-1.png',
  './cards/P/P-2.png',
  './cards/P/P-3.png',
  './cards/P/P-4.png',
  './cards/P/P-5.png',
  './cards/P/P-6.png',
  './cards/P/P-7.png',
  './cards/P/P-8.png',
  './cards/P/P-9.png',
  './cards/P/P-10.png',
  './cards/P/P-Bube.png',
  './cards/P/P-Dame.png',
  './cards/P/P-König.png',
  './cards/P/P-Ass.png',
  './cards/H/H-1.png',
  './cards/H/H-2.png',
  './cards/H/H-3.png',
  './cards/H/H-4.png',
  './cards/H/H-5.png',
  './cards/H/H-6.png',
  './cards/H/H-7.png',
  './cards/H/H-8.png',
  './cards/H/H-9.png',
  './cards/H/H-10.png',
  './cards/H/H-Bube.png',
  './cards/H/H-Dame.png',
  './cards/H/H-König.png',
  './cards/H/H-Ass.png',
  './cards/K/K-1.png',
  './cards/K/K-2.png',
  './cards/K/K-3.png',
  './cards/K/K-4.png',
  './cards/K/K-5.png',
  './cards/K/K-6.png',
  './cards/K/K-7.png',
  './cards/K/K-8.png',
  './cards/K/K-9.png',
  './cards/K/K-10.png',
  './cards/K/K-Bube.png',
  './cards/K/K-Dame.png',
  './cards/K/K-König.png',
  './cards/K/K-Ass.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
