// Cache names
const preCacheName = 'PRE_V3';
// Cache assets
const preCacheAssets = [
							'/',
							'/index.html',
							
							'/style.css',
							'/favicon.ico',
							'/manifest.webmanifest',

							'/js/temp.js',
							'/js/toast.js',
							'/js/db.js',
							'/js/observer.js',
							'/js/listeners.js',
							'/js/render.js',
							'/js/app.js'
						];


// cache size limit function
const limitCacheSize = (name, size) => {
	caches.open(name).then(cache => {
		cache.keys().then(keys => {
			if(keys.length > size){
				cache.delete(keys[0]).then(limitCacheSize(name, size));
			}
		});
	});
};

// install event
self.addEventListener('install', evt => {
	console.log('⚙ Service worker installed');
	self.skipWaiting();
	evt.waitUntil(
		caches.open(preCacheName).then((cache) => {
		console.log('⚙ Service worker Pre-caching');
			cache.addAll(preCacheAssets);
		})
	);
});

// activate event
self.addEventListener('activate', evt => {
	console.log('⚙ Service worker activated');
	evt.waitUntil(
		// Delete old caches versions
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => (key !== preCacheName))
				.map(key => caches.delete(key))
			);
		})
	);
	self.clients.claim();
});

// fetch events
self.addEventListener('fetch', evt => {
	evt.respondWith(
		(async () => {
			const cache = await caches.open(preCacheName);
			const cachedResponse = await cache.match(evt.request);
			if (cachedResponse){
				return cachedResponse;
			} else {
				try {
					const networkResponse = await fetch(evt.request);
					return networkResponse;
				} catch (error) {
					console.log("⚙", error);
				};
			};
		})()
	);
});