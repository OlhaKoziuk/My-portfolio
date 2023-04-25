const cacheName = "portfolio";
const urlToCache = [
    '/',
    './index.html',
     './offline.html',
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

// self.addEventListener('activate', function (event) {
//     event.waitUntil(
//         caches.keys().then(function (names) {
//             return Promise.all(
//                 names.filter(function (name) {
//                     return name;
//                 }).map(function (name) {
//                     return caches.delete(name);
//                 })
//             );
//         })
//     );
// });

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
    


