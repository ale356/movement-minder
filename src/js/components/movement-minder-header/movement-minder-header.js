// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #headerContainer {
  position: relative;
  margin: 100px auto;
  max-width: 400px;
  text-align: center;
  padding: 20px;
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  border-radius: 10px;
  background-color: white;
  text-transform: uppercase;
  }
</style>
<div id="headerContainer">
  <div class="logo">Your Logo Here</div>
  <nav>
    <button id="startPauseButton">Start</button>
    <button id="resetButton">Reset</button>
  </nav>
</div>
`

customElements.define('movement-minder-header',
  /**
   * Represents a MovementMinder header element.
   */
  class extends HTMLElement {
    /**
     * Reference to the header container.
     *
     * @type {HTMLDivElement}
     */
    #headerContainer;

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
      this.#headerContainer = this.shadowRoot.querySelector('#headerContainer');

      // Add event listeners.
      // this.#startPauseButton.addEventListener('click', () => this.#toggleTimer());
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
      } else if (name === 'pause' && newValue !== null) {
        // Handle pause action...
        console.log('Timer paused!')
      }
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
)
