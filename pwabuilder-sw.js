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
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (names) {
            return Promise.all(
                names.filter(function (name) {
                    return name;
                }).map(function (name) {
                    return caches.delete(name);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.responWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    )
})
    
