const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  // TODO: Cache resources needed to start.
  event.waitUntil(
    caches.open(version)
      .then(cache => {
        return cache.addAll([
          'src/notification/doorbell-notification.mp3'
        ]);
      })
  )
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version ', version)
  // TODO: Clean up older versions of the cache.
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching ', version)
  // TODO: Cache new resources when online and serve cached content if offline.

  const cachedFetch = async request => {
    try {
      // Check if the request is from your domain
      if (request.url.startsWith(self.location.origin)) {
        // Try to fetch the asset from the server and if successfull, clone the result.
        const response = await fetch(request)

        // Save the result in the cache.
        const cache = await self.caches.open(version)
        cache.put(request, response.clone())

        return response
      } else {
        // If the request is not from your domain, don't cache it.
        return fetch(request);
      }
    } catch (error) {
      console.info('ServiceWorker: Serving cached result.')
      return caches.match(request)
    }
  }

  event.respondWith(cachedFetch(event.request))
})

self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server ', version)
  // TODO: Show a notification to the user.
})

// Listen for messages from the main JavaScript file.
self.addEventListener('message', event => {
  console.log('Message received in service worker:', event.data);
  // Check if the message is about starting a break
  if (event.data && event.data.type === 'startBreak') {
    // Extract the message from the event data.
    const { message } = event.data;

    // Attempt to show a notification to the user.
    self.registration.showNotification('MovementMinder', {
      body: message,
      // icon: '/path/to/notification/icon.png',
      // Add vibration to the notification.
      vibrate: [200, 100, 200]
    })
  }
});

