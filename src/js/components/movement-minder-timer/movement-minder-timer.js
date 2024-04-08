// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<div id="timerContainer">
    <div id="display">20:00</div>
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
     * Creates an instance of the current type.
     */
    constructor() {
      super();

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true));

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
      // Logic to start the timer...
    }

    /**
     * Pauses the timer.
     */
    #pauseTimer() {
      // Logic to pause the timer...
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
