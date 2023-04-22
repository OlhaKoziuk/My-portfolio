let staticCache = 'portfolio'; 
let dynamicCache = "portfolio-app";



self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(staticCache)
            .then((cache) => cache.addAll(["/index.html"]))
    );
});


self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    
                }).map(function (cacheName) {
                    return caches.delete(cacheName)
                })
            )
        })
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.reqest).catch(() => {
            return caches.match(e.reqest);
        })
    )
});


