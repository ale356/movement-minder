/**
 * The main script file of the application.
 *
 * @author Alejandro Lindström Mamani <al225vh@student.lnu.se>
 * @version 1.0.0
 */

import './components/movement-minder-timer/movement-minder-timer'
import './components/movement-minder-break-timer/movement-minder-break-timer'
import './components/movement-minder-break-notification/movement-minder-break-notification'

// Check if the browser supports the Notification API.
if ("Notification" in window) {
  // Request permission for notifications
  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  }

  requestNotificationPermission();
}

// Register the service worker.
if ('serviceworker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await this.navigator.serviceWorker.register('./serviceworker.js')

      console.log('ServiceWorker: Registration successful with scope: ', registration.scope)
    } catch (error) {
      console.log('ServiceWorker: Registration failed: ', error)
    }
  })
} else {
  console.log('Your browser does not support offline capabilities or notifications.')
}

// Create the web components needed.
const mainTimerElement = document.createElement('movement-minder-timer')
const breakTimerElement = document.createElement('movement-minder-break-timer')
const breakNotificationElement = document.createElement('movement-minder-break-notification')

// Add the components as children to the body element.
document.body.appendChild(mainTimerElement)
document.body.appendChild(breakTimerElement)

