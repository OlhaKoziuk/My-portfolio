const cacheName = "portfolio";
const urlToCache = [
    '/',
    './index.html',
    './css/reset.css',
    './css/style.css'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(urlToCache);
        })
    )
})