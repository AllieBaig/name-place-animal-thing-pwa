const cacheName = 'npat-pwa-v1';
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json'
];

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

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        return response || fetch(event.request);
    }));
});
