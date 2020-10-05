let cache_name = "SimiCart"; // The string used to identify our cache

const assets = [
    "/deroutement/style.css",
    "/deroutement/index.html",
    "/deroutement/main.js",
    "/deroutement/assets/fonts/Roboto-Medium.ttf",
    "/deroutement/"
];

self.addEventListener("install", event => {
    console.log("installing...");
    event.waitUntil(
        caches
            .open(cache_name)
            .then(cache => {
                return cache.addAll(assets);
            })
            .catch(err => console.log(err))
	);
	console.log("installing...terminé");
});



self.addEventListener("fetch", event => {
    if (event.request.url === "https://cyralesson.yo.fr/deroutement/") {
		console.log("url match");
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.caches.open(cache_name).then(cache => cache.match("index.html"))
            )
        );
    } else {
		console.log("bad url");
        event.respondWith(
            fetch(event.request).catch(err =>
                caches.match(event.request).then(response => response)
            )
        );
    }
});
