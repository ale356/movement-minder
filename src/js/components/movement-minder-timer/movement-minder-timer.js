// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<div id="timerContainer">
    <div id="display">30:00</div>
    <button id="startPauseButton">Start</button>
    <button id="resetButton">Reset</button>
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
     * Reference to the current time in seconds.
     *
     * @type {Number}
     */
    #currentTimeInSeconds;

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

      // Set the current time in seconds to 30 minutes.
      this.#currentTimeInSeconds = 30 * 60;

      // Get references to elements to change.
      this.#display = this.shadowRoot.querySelector('#display');
      this.#startPauseButton = this.shadowRoot.querySelector('#startPauseButton');
      this.#resetButton = this.shadowRoot.querySelector('#resetButton');

      // Add event listeners.
      this.#startPauseButton.addEventListener('click', () => this.#toggleTimer());
      this.#resetButton.addEventListener('click', () => this.#resetTimer());
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
        this.#setCurrentTimeInSeconds(0)

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

      // Reset the current time in seconds.
      this.#setCurrentTimeInSeconds(30 * 60)

      // Update the display with the reset time.
      this.#updateDisplay(this.#getCurrentTimeInSeconds());

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
      this.#oscillator = this.audioContext.createOscillator()

      // Set oscillator type to sine wave.
      this.oscillator.type = 'sine'

      // Set the frequency of the sine wave (e.g., 440 Hz for A4).
      this.#oscillator.frequency.setValueAtTime(440, this.#audioContext.currentTime);

      // Connect the oscillator to the destination (output).
      this.#oscillator.connect(this.#audioContext.destination);
    }

    /**
     * Handles the logic when the timer ends.
     */
    #handleTimerEnd() {
      // Create the audio context and oscillator.
      this.createAudioContext();

      // Play the sound.
      this.playSound();

      // Reset the timer.
      this.#resetTimer()
      
      // Emit the "startBreak" event.
      this.dispatchEvent(new window.CustomEvent('startBreak', {
        composed: false,      // Defaults to false but added for clearity.
        bubbles: true         // Needed. We want to bubble the event to todo-list and further.
      }))

      console.log('Timer hit zero!')

    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {

    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }
  }
);
