/**
 * The main script file of the application.
 *
 * @author Alejandro Lindström Mamani <al225vh@student.lnu.se>
 * @version 1.0.0
 */

import './components/movement-minder-timer/movement-minder-timer'
import './components/movement-minder-header/movement-minder-header'
import './components/movement-minder-footer/movement-minder-footer'
import './components/movement-minder-statistics/movement-minder-statistics'
import './components/movement-minder-login-register/movement-minder-login-register'

// Check if the browser supports the Notification API.
if ('Notification' in window) {
  // Request permission for notifications
  /**
   *
   */
  async function requestNotificationPermission () {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      console.log('Notification permission granted.')
    } else {
      console.log('Notification permission denied.')
    }
  }

  requestNotificationPermission()
}

// Register the service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./serviceworker.js')

      console.log('ServiceWorker: Registration successful with scope: ', registration.scope)
    } catch (error) {
      console.log('ServiceWorker: Registration failed: ', error)
    }
  })
} else {
  console.log('Your browser does not support offline capabilities or notifications.')
}

// Listen for the custom event emitted by the web component.
document.addEventListener('startBreak', event => {
  // Forward the message to the service worker.
  navigator.serviceWorker.controller.postMessage({
    type: 'startBreak',
    message: event.detail
  })
})

// Create the web components needed.
const timerElement = document.createElement('movement-minder-timer')
const headerComponent = document.createElement('movement-minder-header')
const footerElement = document.createElement('movement-minder-footer')
const statisticsElement = document.createElement('movement-minder-statistics')
const loginRegisterElement = document.createElement('movement-minder-login-register')

// Select the header element.
const headerElement = document.querySelector('header')

// Set the statistics and login/register components as slot content.
statisticsElement.setAttribute('slot', 'statistics')
loginRegisterElement.setAttribute('slot', 'loginRegister')

// Add the components as children to the body element.
document.body.appendChild(timerElement)
document.body.appendChild(footerElement)
headerElement.appendChild(headerComponent)
headerComponent.appendChild(statisticsElement)
headerComponent.appendChild(loginRegisterElement)
