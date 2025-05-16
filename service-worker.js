const cacheName = 'contextual-pwa-v1';
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

self.addEventListener('install', async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== cacheName).map(name => caches.delete(name))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Serve from cache if available
            }
            return fetch(event.request).then(response => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response because it can only be consumed once
                const responseToCache = response.clone();

                caches.open(cacheName).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Fallback to a cached offline page if available
                // return caches.match('offline.html');
                return; // If no cache and offline, just fail silently for now
            });
        })
    );
});
