const cacheName = "portfolio";
const urlToCache = [
    '/',
    './index.html',
     './offline.html',
    './css/reset.css',
    './css/style.css',
    './img/bootstrap.png',
    './img/close.png',
    './img/css.png',
    './img/facebook.png',
    './img/finsweet.png',
    './img/git.png',
    './img/html.png',
    './img/insta.png',
    './img/ITEA.png',
    './img/javascript.png',
    './img/linkedin.png',
    './img/my-photo.jpg',
    './img/Prometheus-first.jpg',
    './img/Prometheus-second',
    './img/Star.png',
    './img/white-star.png',
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
            .filter(cache_name => cache_name != staticCache) 
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
    


