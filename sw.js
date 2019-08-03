const staticCacheName = 'review-cache-v1';

// Store and Cache the data
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                './',
                'index.html',
                'restaurant.html?id=1',
                'restaurant.html?id=2',
                'restaurant.html?id=3',
                'restaurant.html?id=4',
                'restaurant.html?id=5',
                'restaurant.html?id=6',
                'restaurant.html?id=7',
                'restaurant.html?id=8',
                'restaurant.html?id=9',
                'restaurant.html?id=10',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './css/responsive.css',
                './css/styles.css',
                './img/1.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
                './img/10.jpg',
            ]);
        }).catch((error) => {
            console.log(error);
        })
    );
});

// When the SW is active we can delete the old caches because we don't need them anymore
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                  // Make sure all the caches we delete start with "review-"
                  return cacheName.startsWith('review-') &&
                         cacheName != staticCacheName;
                }).map((cacheName) => {
                  return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
