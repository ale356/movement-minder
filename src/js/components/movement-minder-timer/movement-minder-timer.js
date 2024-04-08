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

        // Check if the timer has reached 0.
        if (this.#getCurrentTimeInSeconds() <= 0) {
          // Clear the interval.
          clearInterval(this.timerInterval);
          // Additional logic when the timer reaches 0 (e.g., alert the user).
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

      // Reset the current time in seconds.
      this.#setCurrentTimeInSeconds(30 * 60)

      // Update the display with the reset time.
      this.#updateDisplay(this.#getCurrentTimeInSeconds());

      // Clear the interval to pause the timer.
      clearInterval(this.timerInterval);
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
