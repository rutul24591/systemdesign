// This is a service worked script. Registered SW is available here.
// We can use `this` or `self` to refer to the service worker context(current service worker which is registered).
// Service workers are event driven.

// Offline experience
// Suppose a file is requested.
// 1. Fetch from network(primary source) and update the cache(2). Cache is supposed to be used as backup for offline
// 2. If network fails, then use the cache.

const CACHE_NAME = 'offline-cache-v1';

const CACHE_FILES = [
  "./index.html",
  "./style.css",
  "./photo.png",
  "./script.js",
];

// Install happens when the page load.
self.addEventListener('install', event => {
  event.waitUntil(
    // Think of caches as a key-value store or DB.
    // Open a cache with the name `offline/v1`. Provide app name 
    caches.open(CACHE_NAME).then(cache => {
      // cache is offline/v1
      cache.addAll(CACHE_FILES)
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
});

self.addEventListener('fetch', event => {
  // Cache the assetsmaybe.
  // Intercept the request and respond with cached assets.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // console.log(`response`, response.json());
        // When are good. Online and network is available.
        const clonedResponse = response.clone();
        //Open the cache
        caches.open(CACHE_NAME).then(cache => {
          // Put the response in the cache
          cache.put(event.request, clonedResponse);
        })

        console.log('RETURING FROM NETWORK:');
        return response
      })
      .catch(() => {
        // If network fails, then use the cache. Offline experience.
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log(`RETURING FROM CACHE: ${event.request.url}`);
              return cachedResponse;
            }
            // else {
            //   // If not found in cache, return a fallback response
            //   // return caches.match('./fallback.html');
            // }
          });
      })
  );
});


// this.addEventListener('push', event => {

// });


