let staticCache = 'portfolio'; // створення назви кешу
let dynamicCache = "portfolio-app";
let assets = [ // створення списку з файлів, які будуть кешуватися
    "/",
    "/manifest.json",
    "/img/bootstrap.png",
    "/img/close.png",
    "/img/css.png",
    "/img/facebook.png",
    "/img/finsweet.png",
    "/img/git.png",
    "/img/html.png",
    "/img/insta.png",
    "/img/ITEA.png",
    "/img/javascript.png",
    "/img/linkedin.png",
    "/img/my-photo.jpg",
    "/img/Prometheus-first.jpg",
    "/img/Prometheus-second.jpg",
    "/img/Star.png",
    "/img/white-star.png",
    "/index.html",
    "/offline.html",
    "/js/script.js"  
];




// self.addEventListener("install", async e => {
//    // інсталцяція server worker
//     let cache = await caches.open(staticCache); // відкриваємо наш кеш
//     await cache.addAll(assets); // записуємо нові файли у наш кеш
// });

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(staticCache)
            .then((cache) => cache.addAll(['/img/css.png', "/index.html"]))
    );
});


self.addEventListener("activate", async e => { // активація server worker
    let cache = await caches.keys(); // беремо всі кеші, які є на сайті

    await Promise.all( // чекаємо, коли кожеш кеш завантажиться
        cache // беремо ці кеші списком
            .filter(cache_name => cache_name != staticCache) // створюємо список із кешів, які застралі
            .filter(cache_name => cache_name != dynamicCache)
            .map(cache_data => caches.delete(cache_data)) // видаляємо застарілі кеші по черзі
    );
});


self.addEventListener("fetch", e => { // робимо запит на наш server worker (ось тут більшість коду та логіки буде створюватися)
    
    e.respondWith(checkCache(e.request));

    e.respondWith(caches.match(e.request));
     // робимо так, щоб наш сайт завантажувався з кешу, який ми знайшли по запуту
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