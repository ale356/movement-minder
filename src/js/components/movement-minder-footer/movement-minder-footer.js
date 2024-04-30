// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #footerContainer {
  display: flex; /* Use Flexbox */
  justify-content: space-between; /* Distribute children with equal space between them */
  align-items: center; /* Vertically center children */
  position: relative;
  margin: auto;
  max-width: 400px;
  text-align: center;
  padding: 10px;
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  text-transform: uppercase;
  border-top: 2px solid #DFDFDF; /* Add a solid black border at the bottom */
  color: #A6A6A6;
  }
</style>
<div id="footerContainer">
  <footer>
  <p>&copy; 2024 MovementMinder. All rights reserved.</p>
  </footer>
</div>
`

customElements.define('movement-minder-footer',
  /**
   * Represents a MovementMinder footer element.
   */
  class extends HTMLElement {
    /**
     * Reference to the footer container.
     *
     * @type {HTMLDivElement}
     */
    #footerContainer;

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
      this.#footerContainer = this.shadowRoot.querySelector('#footerContainer');

      // Add event listeners.
      // this.#startPauseButton.addEventListener('click', () => this.#toggleTimer());
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
