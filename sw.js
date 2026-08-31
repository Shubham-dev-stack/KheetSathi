// KheetSathi Service Worker - Offline Resilience (with On-Device ML Model Caching)
const CACHE_NAME = 'kheetsathi-cache-v3.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/i18n.js',
  './js/data.js',
  './js/ort.min.js',
  './js/mlEngine.js',
  './js/ort-wasm.wasm',
  './js/ort-wasm-simd.wasm',
  './js/qualityCheck.js',
  './js/storage.js',
  './js/simulationEngine.js',
  './js/app.js',
  './model/model.onnx',
  './model/model_quantized.onnx',
  './model/class_labels.json',
  './assets/images/hero_farm.jpg',
  './assets/images/crop_potato.jpg',
  './assets/images/crop_tomato.jpg',
  './assets/images/crop_rice.jpg',
  './assets/images/crop_wheat.jpg',
  './assets/images/crop_cotton.jpg',
  './assets/images/sample_potato_blight.jpg',
  './assets/images/sample_tomato_curl.jpg',
  './assets/images/sample_rice_blight.jpg',
  './assets/images/sample_healthy_leaf.jpg',
  './assets/images/sample_tractor.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell and realistic photo assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Cache-first strategy with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Fallback for offline if not cached
        return caches.match('./index.html');
      });
    })
  );
});
