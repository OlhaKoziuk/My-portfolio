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

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })   
     )
});


