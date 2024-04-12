const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  // TODO: Cache resources needed to start.
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