// service-worker.js

const CACHE_NAME = 'name-place-animal-thing-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
    '/auth.js',
    '/core.js',
    '/debug.js',
    '/diceChallenge.js',
    '/error-handler.js',
    '/game-logic.js',
    '/game-ui.js',
    '/gameNavigation.js',
    '/probe.js',
    '/regularGame.js',
    '/safari-content.js',
    '/service-worker.js', // Cache this file itself
    '/utils.js',
    '/wordSafari.js',
    '/wireframeGenerator.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
    // Add paths to any other image or asset files you want to cache
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service worker installed, caching assets');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service worker installation failed:', error);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service worker activated, clearing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    console.log('Service worker found in cache:', event.request.url);
                    return response;
                }

                // Not in cache - fetch from network
                console.log('Service worker fetching from network:', event.request.url);
                return fetch(event.request).then(
                    response => {
                        // Check if response is valid
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response for caching
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                console.log('Service worker caching new resource:', event.request.url);
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                ).catch(() => {
                    // If fetch fails, maybe return a cached offline page
                    console.log('Service worker fetch failed:', event.request.url);
                    // Example: return caches.match('/offline.html');
                });
            })
    );
});
