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
    // Add paths to any image or asset files you want to cache
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    // ... other assets ...
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Error during cache population:', error);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Clearing old cache:', cacheName);
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
                    return response;
                }
                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the response to be consumed by the
                        // cache AND the browser we need to clone it.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        // Return the fetched response returned from the server
                        return response;
                    }
                );
            })
    );
});
