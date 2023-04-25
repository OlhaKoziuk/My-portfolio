const cacheName = "portfolio";
const urlToCache = [
    '/',
    './index.html',
     './offline.html',
    './css/reset.css',
    './css/style.css',
    './img/my-photo.jpg',
    './js/script.js'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(urlToCache);
            })
    )
});


self.addEventListener("activate", async e => {
    let cache = await caches.keys(); 

    await Promise.all( 
        cache 
            .filter(cache_name => cache_name != cacheName) 
            .map(cache_data => caches.delete(cache_data)) 
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match('./offline.html');
        })
    );
});
    


