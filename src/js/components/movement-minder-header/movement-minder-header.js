// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #headerContainer {
    display: flex; /* Use Flexbox */
  justify-content: space-between; /* Distribute children with equal space between them */
  align-items: center; /* Vertically center children */
  position: relative;
  margin: auto;
  text-align: center;
  padding: 20px;
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  text-transform: uppercase;
  border-bottom: 2px solid #DFDFDF; /* Add a solid black border at the bottom */
  }

  #logo {
    margin: 10px;
    background-color: #37C59C;
    border: none;
    border-radius: 12px;
    font-family: 'Montserrat', sans-serif;
  }

  #logoContainer {
  display: flex; /* Use Flexbox */
  align-items: center; /* Align children vertically */
}

  h1 {
    font-size: small;
  }

  nav {
  display: flex; /* Use Flexbox */
  align-items: center; /* Align children vertically */
}

  /* Media queries for responsiveness */
  @media screen and (min-width: 405px) and (max-width: 550px) {

#logo {
    transform: scale(1.4);
  }

  h1 {
    font-size: 17px;
  }
}

@media screen and (min-width: 550px) {
  #logo {
    transform: scale(1.8);
  }

  h1 {
    font-size: 22px;
  }

  #logoContainer h1 {
    margin-left: 10px;
  }
}
</style>
<div id="headerContainer">
  <div id="logoContainer">
    <svg id="logo" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#000000" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
    <h1>MovementMinder</h1>
  </div>
  <div id="navContainer">
  <nav>
  <slot name="statistics"></slot>
  <slot name="loginRegister"></slot>
  </nav>
  </div>
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
