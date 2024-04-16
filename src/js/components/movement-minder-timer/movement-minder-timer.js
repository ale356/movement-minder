// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<div id="timerContainer">
  <div id="display">30:00</div>
  <div id="messageContainer">
  <p id="breakMessage">Time to take a walking break.</p>
</div>
<button id="startPauseButton">Start</button>
<button id="resetButton">Reset</button>
<button id="configureButton">Configure</button>
<div id="configurationContainer">
  <form id="timerConfigForm">
    <div id="mainTimeContainer">
      <label for="mainTimeInput">Main Time:</label>
      <input type="number" id="mainTimeInput" name="mainTime" placeholder="Enter main time in minutes" min="1" max="240">
    </div>
    <div id="breakTimeContainer">
      <label for="breakTimeInput">Break Time:</label>
      <input type="number" id="breakTimeInput" name="breakTime" placeholder="Enter break time in minutes" min="1" max="1000">
    </div>
    <button type="submit">Confirm</button>
  </form>
</div>

</div>
`;

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
    #display;

    /**
     * Reference to the start/pause button.
     *
     * @type {HTMLButtonElement}
     */
    #startPauseButton;

    /**
     * Reference to the reset button.
     *
     * @type {HTMLButtonElement}
     */
    #resetButton;

    /**
     * Reference to the configute button.
     *
     * @type {HTMLButtonElement}
     */
    #configureButton;

    /**
     * Reference to the configuration container.
     *
     * @type {HTMLDivElement}
     */
    #configurationContainer

    /**
     * Reference to the current time in seconds.
     *
     * @type {Number}
     */
    #currentTimeInSeconds;

    /**
     * Reference to the start time value in minutes for the main timer.
     *
     * @type {Number}
     */
    #mainTimerTimeInSeconds;

    /**
     * Reference to the start time value in minutes for the break timer.
     *
     * @type {Number}
     */
    #breakTimerTimeInSeconds;

    /**
     * Reference to the message container.
     *
     * @type {HTMLDivElement}
     */
    #messageContainer

    /**
     * Break is active.
     *
     * @type {Boolean}
     */
    #breakIsActive

    /**
     * Reference to the AudioContext instance.
     *
     * @type {AudioContext}
     */
    #audioContext;

    /**
     * Reference to the Oscillator instance.
     *
     * @type {OscillatorNode}
     */
    #oscillator;

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super();

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));

      // Set the basic start values for the timer.
      this.#mainTimerTimeInSeconds = 30 * 60
      this.#breakTimerTimeInSeconds = 5 * 60
      this.#currentTimeInSeconds = 30 * 60
      this.#breakIsActive = false

      // Get references to elements to change.
      this.#display = this.shadowRoot.querySelector('#display');
      this.#startPauseButton = this.shadowRoot.querySelector('#startPauseButton');
      this.#resetButton = this.shadowRoot.querySelector('#resetButton');
      this.#configureButton = this.shadowRoot.querySelector('#configureButton')
      this.#configurationContainer = this.shadowRoot.querySelector('#configurationContainer')
      this.#messageContainer = this.shadowRoot.querySelector('#messageContainer');

      // Add event listeners.
      this.#startPauseButton.addEventListener('click', () => this.#toggleTimer());
      this.#resetButton.addEventListener('click', () => this.#resetTimer());
      this.#configureButton.addEventListener('click', () => this.#toggleConfiguration());
    }

    /**
     * Watches the attributes "start" and "pause" for changes on the element.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes() {
      return ['start', 'pause'];
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'start' && newValue !== null) {
        // Handle start action...
        console.log('Timer started!')
        this.#startTimer();
      } else if (name === 'pause' && newValue !== null) {
        // Handle pause action...
        console.log('Timer paused!')
        this.#pauseTimer();
      }
    }

    /**
     * Toggles the timer between start and pause states.
     */
    #toggleTimer() {
      if (this.hasAttribute('start')) {
        this.removeAttribute('start');
        this.setAttribute('pause', '');
        this.#startPauseButton.textContent = 'Start';
      } else {
        this.removeAttribute('pause');
        this.setAttribute('start', '');
        this.#startPauseButton.textContent = 'Pause';
      }
    }

    /**
     * Starts the timer.
     */
    #startTimer() {
      // Update the display initially.
      this.#updateDisplay(this.#getCurrentTimeInSeconds());

      // Update the display every second.
      this.timerInterval = setInterval(() => {
        // Decrement the time by one second.
        this.#setCurrentTimeInSeconds(this.#getCurrentTimeInSeconds() - 1);

        // Update the display
        this.#updateDisplay(this.#getCurrentTimeInSeconds());

        // Test the timer when it reaches zero.
        // this.#setCurrentTimeInSeconds(0)

        // Check if the timer has reached 0.
        if (this.#getCurrentTimeInSeconds() <= 0) {
          this.#handleTimerEnd()
        }
      }, 1000); // Update every second (1000 milliseconds).
    }

    /**
     * Getter for currentTimeInSeconds.
     * @returns {number} The current time in seconds.
     */
    #getCurrentTimeInSeconds() {
      return this.#currentTimeInSeconds;
    }

    /**
     * Setter for currentTimeInSeconds.
     * @param {number} newValue The new value for current time in seconds.
     */
    #setCurrentTimeInSeconds(newValue) {
      this.#currentTimeInSeconds = newValue;
    }

    /**
     * Updates the display with the current time.
     * 
     * @param {number} timeInSeconds The time in seconds.
     */
    #updateDisplay(timeInSeconds) {
      // Calculate minutes and seconds
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;

      // Format minutes and seconds with leading zeros
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      // Update the display
      this.#display.textContent = formattedTime;

      // Update the browser tab text.
      document.title = `${formattedTime}`
    }

    /**
     * Pauses the timer.
     */
    #pauseTimer() {
      // Clear the interval to pause the timer.
      clearInterval(this.timerInterval);
    }

    /**
     * Resets the timer.
     */
    #resetTimer() {

      // Remove start attribute and reset text content.
      if (this.hasAttribute('start')) {
        this.removeAttribute('start');
        this.#startPauseButton.textContent = 'Start';
      }

      // Reset timer depending on break or main.
      if (this.#breakIsActive == true) {
        // Reset the timer to break.
        this.#setCurrentTimeInSeconds(this.#breakTimerTimeInSeconds)
        this.#updateDisplay(this.#getCurrentTimeInSeconds());
      } else {
        // Reset the timer to main.
        this.#setCurrentTimeInSeconds(this.#mainTimerTimeInSeconds)
        this.#updateDisplay(this.#getCurrentTimeInSeconds());
      }

      // Clear the interval to pause the timer.
      clearInterval(this.timerInterval);
    }

    /**
     * Runs the oscillator, plays a sound.
     */
    #playSound() {
      if (this.#audioContext && this.#oscillator) {
        this.#oscillator.start();
        setTimeout(() => {
          this.#oscillator.stop();
        }, 1000); // 1000 milliseconds = 1 second.
      }
    }

    /**
     * Create AudioContext and OscillatorNode.
     */
    #createAudioContextAndOscillator() {
      // Setup the audio.
      // Create an AudioContext instance.
      this.#audioContext = new AudioContext()

      // Create an OscillatorNode.
      this.#oscillator = this.#audioContext.createOscillator()

      // Set oscillator type to sine wave.
      this.#oscillator.type = 'sine'

      // Set the frequency of the sine wave (e.g., 440 Hz for A4).
      this.#oscillator.frequency.setValueAtTime(440, this.#audioContext.currentTime);

      // Connect the oscillator to the destination (output).
      this.#oscillator.connect(this.#audioContext.destination);
    }

    /**
     * Handles the logic when the timer ends.
     */
    #handleTimerEnd() {

      // Decide if its break time or main time.
      if (this.#breakIsActive == true) {
        // Setup timer for main.
        this.#handleStartMainEvent()
      } else {
        // Setup timer for break.
        this.#handleStartBreakEvent()
      }

      // Create the audio context and oscillator.
      this.#createAudioContextAndOscillator();

      // Play the sound.
      this.#playSound();

      console.log('Timer hit zero!')

    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {
      // Hide elements from the user.
      this.#messageContainer.setAttribute('hidden', '')
      this.#configurationContainer.setAttribute('hidden', '')

    }

    /**
     * Handle the "startBreak" event.
     */
    #handleStartBreakEvent() {
      // Start the break timer.
      console.log('Received startBreak event');
      this.#messageContainer.removeAttribute('hidden', '')
      this.#breakIsActive = true

      // Reset the timer.
      this.#resetTimer()

      // Update the browser tab text.
      document.title = '00:00 - Time to take a break!'

      // Emit the "startBreak" event.
      this.dispatchEvent(new window.CustomEvent('startBreak', {
        composed: false,      // Defaults to false but added for clearity.
        bubbles: true,         // Needed. We want to bubble the event to todo-list and further.
        detail: 'Time to take a break!'
      }))
    }

    /**
     * Handle the "startMain" event.
     */
    #handleStartMainEvent() {
      // Start the main timer.
      this.#messageContainer.setAttribute('hidden', '')
      this.#breakIsActive = false

      // Reset the timer.
      this.#resetTimer()

      // Set the browser tab text.
      document.title = '00:00 - Break is finished!'

      // Emit the "startBreak" event.
      this.dispatchEvent(new window.CustomEvent('startBreak', {
        composed: false,      // Defaults to false but added for clearity.
        bubbles: true,         // Needed. We want to bubble the event to todo-list and further.
        detail: 'Break is finished!'
      }))

    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }

    /**
     * Shows the configuration settings.
     */
    #toggleConfiguration() {
      if (this.#configurationContainer.hasAttribute('hidden')) {
        this.#configurationContainer.removeAttribute('hidden');
      } else {
        this.#configurationContainer.setAttribute('hidden', '');
      }
    }
  }
);
