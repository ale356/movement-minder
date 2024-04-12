const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  // TODO: Cache resources needed to start.
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version ', version)
  // TODO: Clean up older versions of the cache.
})

self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server ', version)
  // TODO: Show a notification to the user.
})