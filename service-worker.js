// service-worker.js

console.log('Service worker loaded');

self.addEventListener('install', event => {
    console.log('Service worker installing...');
    // Perform any initial setup here, like caching essential assets
    event.waitUntil(
        caches.open('v1').then(cache => {
            console.log('Caching essential assets');
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/manifest.json'
                // Add other critical, small assets here
            ]);
        }).catch(error => console.error('Cache error during install:', error))
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
    // Clean up old caches if necessary
    const cacheWhitelist = ['v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    // Intercept all fetch requests
    event.respondWith(
        caches.match(event.request).then(response => {
            // Return cached response if found, otherwise fetch from network
            if (response) {
                console.log('Serving from cache:', event.request.url);
                return response;
            }
            console.log('Fetching from network:', event.request.url);
            return fetch(event.request);
        }).catch(() => {
            // Optional: Return a fallback response if both cache and network fail
            // console.log('Fetch failed:', event.request.url);
            // return new Response('Offline, but something went wrong!', {
            //     status: 503,
            //     statusText: 'Service Unavailable'
            // });
        })
    );
});
