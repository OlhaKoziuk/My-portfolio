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

self.addEventListener("fetch", e => { 
    
    e.respondWith(checkCache(e.request));

    // e.respondWith(caches.match(e.request)); 
});
    
async function checkCache (request) {
    const cache = await caches.match(request);
    return cache ?? checkOnline(request);
};

async function checkOnline(request){
    const cache = await caches.open(dynamicCache)

    try{
        const res = await fetch(request)
        await cache.put(request, res.clone())
        return res
    }
    catch(e){
        const cachedRes = await cache.match(request);

        if (cachedRes) {
            return cachedRes;
        } else {
            return caches.match('./offline.html');
        }
        
    }
}