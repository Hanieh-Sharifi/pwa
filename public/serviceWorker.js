const CACHE_NAME = "version1";
const urlsToCache = ["index.html","offline.html"];
const self = this;


// intstall service worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {console.log("opened cache");return cache.addAll(urlsToCache)})
    )
})

// listen for requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(()=>fetch(event.request))
        .catch((error) => caches.match("offline.html"))
    )
})


// activate the serviceWorker
self.addEventListener("activate", (event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys()
        .then((cacheNames) => { 
            Promise.all(cacheNames.map((cacheName) => { 
                if (!cacheWhiteList.includes(cacheName))
                {
                    caches.delete(cacheName);
                }
            }))
        })
        .catch(error => {

        })
    )
})