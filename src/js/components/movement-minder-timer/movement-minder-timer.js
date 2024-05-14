import { jwtDecode } from 'jwt-decode'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #timerContainer {
  position: relative;
  margin: 50px 10px;
  max-width: 400px;
  text-align: center;
  padding: 20px;
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  border-radius: 10px;
  background-color: white;
  text-transform: uppercase;
  }


  #breakMessage {
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  }

  #configureButton {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
  justify-content: center; /* Add this line */
}

  #configurationContainer {
  margin-top: 70px;
  }

  #display {
  font-size: 72px;
  color: #37C59C;
  margin-bottom: 20px;
  }

  button {
    font-size: 36px;
    padding: 10px 20px;
    margin: 10px;
    color: white;
    background-color: #37C59C;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  }

  button:hover {
    opacity: 0.7;
  }

#timerConfigurationForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#mainTimeContainer,
#breakTimeContainer {
  margin-bottom: 15px;
}

label {
  font-size: 18px;
}

input[type="number"] {
  margin-top: 10px;
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media screen and (min-width: 550px) {
  #timerContainer {
  margin: 40px auto 20px auto;
  }

  @media screen and (min-width: 700px) {
  #timerContainer {
    margin-top: 100px;
  }

  @media screen and (min-width: 900px) {
  #timerContainer {
    margin-top: 140px;
  }
}

</style>
<div id="timerContainer">
<button id="configureButton"><svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg></button>
<div id="configurationContainer">
    <form id="timerConfigurationForm">
      <div id="mainTimeContainer">
        <label for="mainTimeInput">Main Time:</label>
        <input type="number" id="mainTimeInput" name="mainTime" placeholder="Enter time in minutes..." min="1" max="240" required>
      </div>
      <div id="breakTimeContainer">
        <label for="breakTimeInput">Break Time:</label>
        <input type="number" id="breakTimeInput" name="breakTime" placeholder="Enter time in minutes..." min="1" max="1440" required>
      </div>
      <button id="confirmButton" type="submit">Confirm</button>
    </form>
  </div>
  <p id="display">30:00</p>
  <div id="messageContainer">
  <p id="breakMessage">Time to take a walking break.</p>
  </div>
  <button id="startPauseButton">Start</button>
  <button id="resetButton">Reset</button>
</div>
`

customElements.define('movement-minder-timer',
  /**
   * Represents a MovementMinder timer element.
   */
  class extends HTMLElement {
    /**
     * Reference to the display.
     *
     * @type {HTMLDivElement}
     */
    #display

    /**
     * Reference to the start/pause button.
     *
     * @type {HTMLButtonElement}
     */
    #startPauseButton

    /**
     * Reference to the reset button.
     *
     * @type {HTMLButtonElement}
     */
    #resetButton

    /**
     * Reference to the configure button.
     *
     * @type {HTMLButtonElement}
     */
    #configureButton

    /**
     * Reference to the timer configuration form.
     *
     * @type {HTMLFormElement}
     */
    #timerConfigurationForm

    /**
     * Reference to the configuration container.
     *
     * @type {HTMLDivElement}
     */
    #configurationContainer

    /**
     * Reference to the current time in seconds.
     *
     * @type {number}
     */
    #currentTimeInSeconds

    /**
     * Reference to the start time value in seconds for the main timer.
     *
     * @type {number}
     */
    #mainTimerTimeInSeconds

    /**
     * Reference to the start time value in seconds for the break timer.
     *
     * @type {number}
     */
    #breakTimerTimeInSeconds

    /**
     * Reference to the message container.
     *
     * @type {HTMLDivElement}
     */
    #messageContainer

    /**
     * Break is active.
     *
     * @type {boolean}
     */
    #breakIsActive

    /**
     * Reference to the AudioContext instance.
     *
     * @type {AudioContext}
     */
    #audioContext

    /**
     * Reference to the Oscillator instance.
     *
     * @type {OscillatorNode}
     */
    #oscillator

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Set the basic start values for the timer.
      this.#mainTimerTimeInSeconds = 30 * 60
      this.#breakTimerTimeInSeconds = 5 * 60
      this.#currentTimeInSeconds = 30 * 60
      this.#breakIsActive = false

      // Get references to elements to change.
      this.#display = this.shadowRoot.querySelector('#display')
      this.#startPauseButton = this.shadowRoot.querySelector('#startPauseButton')
      this.#resetButton = this.shadowRoot.querySelector('#resetButton')
      this.#configureButton = this.shadowRoot.querySelector('#configureButton')
      this.#timerConfigurationForm = this.shadowRoot.querySelector('#timerConfigurationForm')
      this.#configurationContainer = this.shadowRoot.querySelector('#configurationContainer')
      this.#messageContainer = this.shadowRoot.querySelector('#messageContainer')

      // Add event listeners.
      this.#startPauseButton.addEventListener('click', () => this.#toggleTimer())
      this.#resetButton.addEventListener('click', () => this.#resetTimer())
      this.#configureButton.addEventListener('click', () => this.#toggleConfiguration())
      this.#timerConfigurationForm.addEventListener('submit', (event) => this.#handleConfirm(event))
    }

    /**
     * Watches the attributes "start" and "pause" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['start', 'pause']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'start' && newValue !== null) {
        // Handle start action...
        console.log('Timer started!')
        this.#startTimer()
      } else if (name === 'pause' && newValue !== null) {
        // Handle pause action...
        console.log('Timer paused!')
        this.#pauseTimer()
      }
    }

    /**
     * Toggles the timer between start and pause states.
     */
    #toggleTimer () {
      if (this.hasAttribute('start')) {
        this.removeAttribute('start')
        this.setAttribute('pause', '')
        this.#startPauseButton.textContent = 'Start'
      } else {
        this.removeAttribute('pause')
        this.setAttribute('start', '')
        this.#startPauseButton.textContent = 'Pause'
      }
    }

    /**
     * Starts the timer.
     */
    #startTimer () {
      // Update the display initially.
      this.#updateDisplay(this.#getCurrentTimeInSeconds())

      // Update the display every second.
      this.timerInterval = setInterval(() => {
        // Decrement the time by one second.
        this.#setCurrentTimeInSeconds(this.#getCurrentTimeInSeconds() - 1)

        // Update the display
        this.#updateDisplay(this.#getCurrentTimeInSeconds())

        // Test the timer when it reaches zero.
        // this.#setCurrentTimeInSeconds(0)

        // Check if the timer has reached 0.
        if (this.#getCurrentTimeInSeconds() <= 0) {
          this.#handleTimerEnd()
        }
      }, 1000) // Update every second (1000 milliseconds).
    }

    /**
     * Getter for currentTimeInSeconds.
     *
     * @returns {number} The current time in seconds.
     */
    #getCurrentTimeInSeconds () {
      return this.#currentTimeInSeconds
    }

    /**
     * Setter for currentTimeInSeconds.
     *
     * @param {number} newValue The new value for current time in seconds.
     */
    #setCurrentTimeInSeconds (newValue) {
      this.#currentTimeInSeconds = newValue
    }

    /**
     * Updates the display with the current time.
     *
     * @param {number} timeInSeconds The time in seconds.
     */
    #updateDisplay (timeInSeconds) {
      // Calculate minutes and seconds
      const minutes = Math.floor(timeInSeconds / 60)
      const seconds = timeInSeconds % 60

      // Format minutes and seconds with leading zeros
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      // Update the display
      this.#display.textContent = formattedTime

      // Update the browser tab text.
      document.title = `${formattedTime}`
    }

    /**
     * Pauses the timer.
     */
    #pauseTimer () {
      // Clear the interval to pause the timer.
      clearInterval(this.timerInterval)
    }

    /**
     * Resets the timer.
     */
    #resetTimer () {
      // Remove start attribute and reset text content.
      if (this.hasAttribute('start')) {
        this.removeAttribute('start')
        this.#startPauseButton.textContent = 'Start'
      }

      // Reset timer depending on break or main.
      if (this.#breakIsActive === true) {
        // Reset the timer to break.
        this.#setCurrentTimeInSeconds(this.#breakTimerTimeInSeconds)
        this.#updateDisplay(this.#getCurrentTimeInSeconds())
      } else {
        // Reset the timer to main.
        this.#setCurrentTimeInSeconds(this.#mainTimerTimeInSeconds)
        this.#updateDisplay(this.#getCurrentTimeInSeconds())
      }

      // Clear the interval to pause the timer.
      clearInterval(this.timerInterval)
    }

    /**
     * Runs the oscillator, plays a sound.
     */
    #playSound () {
      if (this.#audioContext && this.#oscillator) {
        this.#oscillator.start()
        setTimeout(() => {
          this.#oscillator.stop()
        }, 1000) // 1000 milliseconds = 1 second.
      }
    }

    /**
     * Create AudioContext and OscillatorNode.
     */
    #createAudioContextAndOscillator () {
      // Setup the audio.
      // Create an AudioContext instance.
      this.#audioContext = new AudioContext()

      // Create an OscillatorNode.
      this.#oscillator = this.#audioContext.createOscillator()

      // Set oscillator type to sine wave.
      this.#oscillator.type = 'sine'

      // Set the frequency of the sine wave (e.g., 440 Hz for A4).
      this.#oscillator.frequency.setValueAtTime(440, this.#audioContext.currentTime)

      // Connect the oscillator to the destination (output).
      this.#oscillator.connect(this.#audioContext.destination)
    }

    /**
     * Handles the logic when the timer ends.
     */
    #handleTimerEnd () {
      // Check if the user is logged in.
      const userIsLoggedIn = this.#isLoggedIn()
      // Decide if its break time or main time.
      if (this.#breakIsActive === true) {
        // Setup timer for main (main time).
        this.#handleStartMainEvent()
        // Update the break time property on the timeTracker object on the back-end.
        if (userIsLoggedIn) {
          this.#updateTimeTrackerTime('totalBreakTime')
        }
      } else {
        // Setup timer for break (break time).
        this.#handleStartBreakEvent()
        // Update the sedentary property on the timeTracker object on the back-end.
        if (userIsLoggedIn) {
          this.#updateTimeTrackerTime('totalSedentaryTime')
        }
      }

      // Create the audio context and oscillator.
      this.#createAudioContextAndOscillator()

      // Play the sound.
      this.#playSound()

      console.log('Timer hit zero!')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      // Hide elements from the user.
      this.#messageContainer.setAttribute('hidden', '')
      this.#configurationContainer.setAttribute('hidden', '')
    }

    /**
     * Gets the JWT token from the local storage.
     *
     * @returns {object} a JWT token.
     */
    #getJwtTokenFromLocalStorage () {
      // Retrieve the JWT token from local storage.
      const jwtToken = localStorage.getItem('accessToken')
      return jwtToken
    }

    /**
     * Checks if a user is logged in.
     *
     * @returns {boolean} depending if the user is logged in or not.
     */
    #isLoggedIn () {
      if (this.#getJwtTokenFromLocalStorage !== undefined) {
        return true
      } else {
        return false
      }
    }

    /**
     * Updates the time on the timeTracker object in the back-end.
     *
     * @param {object} propertyToUpdate - The property to change on the timeTracker object.
     */
    async #updateTimeTrackerTime (propertyToUpdate) {
      try {
        // Get the payload data.
        const jwtToken = this.#getJwtTokenFromLocalStorage()
        const payLoadData = jwtDecode(jwtToken)

        // Construct the URL for the GET request.
        const url = `https://movement-minder-restful-api.onrender.com/api/v1/timeTrackers/${payLoadData.timeTrackerId}`

        // Decide what time data to update.
        let newTimeData
        let oldTimeData
        const timeTrackerObject = await this.#fetchUserActivityData(jwtToken)

        if (propertyToUpdate === 'totalSedentaryTime') {
          newTimeData = this.#mainTimerTimeInSeconds / 60
          oldTimeData = timeTrackerObject.totalSedentaryTime
        } else {
          newTimeData = this.#breakTimerTimeInSeconds / 60
          oldTimeData = timeTrackerObject.totalBreakTime
        }
        // The JSON data to update the timerTracker object with.
        const jsonData = {
          [propertyToUpdate]: oldTimeData + newTimeData
        }

        // Make the PUT request with the JWT token in the Authorization header.
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json' // Specify the content type as JSON.
          },
          body: JSON.stringify(jsonData) // Convert your JSON data to a string.
        })

        if (response.ok) {
          // Handle successful response.
        } else {
          // Handle error response
          throw new Error('Failed to update the timeTracker data')
        }
      } catch (error) {
        // Handle fetch errors
        console.error('Error updating timeTracker data:', error)
      }
    }

    /**
     * Make a GET fetch request to get the users activity data from the server.
     *
     * @param {object} jwtToken - A JWT access token.
     * @returns {object} a timeTracker object.
     */
    async #fetchUserActivityData (jwtToken) {
      try {
        // Get the payload data.
        const payLoadData = jwtDecode(jwtToken)

        // Construct the URL for the GET request.
        const url = `https://movement-minder-restful-api.onrender.com/api/v1/timeTrackers/${payLoadData.timeTrackerId}`

        // Make the GET request with the JWT token in the Authorization header.
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })

        if (response.ok) {
          // Handle successful response
          const data = await response.json()
          // You can perform further actions with the retrieved data here
          return data
        } else {
          // Handle error response
          throw new Error('Failed to fetch timeTracker data')
        }
      } catch (error) {
        // Handle fetch errors
        console.error('Error fetching timeTracker data:', error)
      }
    }

    /**
     * Handle the "startBreak" event.
     */
    #handleStartBreakEvent () {
      // Start the break timer.
      this.#messageContainer.removeAttribute('hidden', '')
      this.#breakIsActive = true

      // Reset the timer.
      this.#resetTimer()

      // Update the browser tab text.
      document.title = '00:00 - Time to take a break!'

      // Emit the "startBreak" event.
      this.dispatchEvent(new window.CustomEvent('startBreak', {
        composed: false, // Defaults to false but added for clearity.
        bubbles: true, // Needed. We want to bubble the event to todo-list and further.
        detail: 'Time to take a break!'
      }))
    }

    /**
     * Handle the "startMain" event.
     */
    #handleStartMainEvent () {
      // Start the main timer.
      this.#messageContainer.setAttribute('hidden', '')
      this.#breakIsActive = false

      // Reset the timer.
      this.#resetTimer()

      // Set the browser tab text.
      document.title = '00:00 - Break is finished!'

      // Emit the "startBreak" event.
      this.dispatchEvent(new window.CustomEvent('startBreak', {
        composed: false, // Defaults to false but added for clearity.
        bubbles: true, // Needed. We want to bubble the event to todo-list and further.
        detail: 'Break is finished!'
      }))
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
    }

    /**
     * Shows the configuration settings.
     */
    #toggleConfiguration () {
      if (this.#configurationContainer.hasAttribute('hidden')) {
        this.#configurationContainer.removeAttribute('hidden')
      } else {
        this.#configurationContainer.setAttribute('hidden', '')
      }
    }

    /**
     * Handles the confirm logic.
     *
     * @param {object} event - An event object.
     */
    #handleConfirm (event) {
      // Prevent the default form submission behavior.
      event.preventDefault()

      // Collect input data.
      const mainTime = this.shadowRoot.getElementById('mainTimeInput').value
      const breakTime = this.shadowRoot.getElementById('breakTimeInput').value

      // Set the new time.
      this.#mainTimerTimeInSeconds = mainTime * 60
      this.#breakTimerTimeInSeconds = breakTime * 60

      // Reset the timer.
      this.#resetTimer()

      // Hide the configuration form.
      this.#toggleConfiguration()
    }
  }
)
