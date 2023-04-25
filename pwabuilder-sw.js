let staticCache = 'portfolio'; 
let dynamicCache = "portfolio-v5";
let assets = [ 
    "/",
    "./manifest.json",
    "./index.html",
    "./offline.html",
    "./js/script.js",
  
];


self.addEventListener("install", async e => { 
    let cache = await caches.open(staticCache); 
    await cache.addAll(assets); 
});

self.addEventListener("activate", async e => { 
    let cache = await caches.keys(); 

  await Promise.all(
    cache 
            .filter(cache_name => cache_name != staticCache) 
            .filter(cache_name => cache_name != dynamicCache)
            .map(cache_data => caches.delete(cache_data)) 
    );
});


self.addEventListener("fetch", e => { 
    
    e.respondWith(checkCache(e.request));

    e.respondWith(caches.match(e.request)); // робимо так, щоб наш сайт завантажувався з кешу, який ми знайшли по запуту
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