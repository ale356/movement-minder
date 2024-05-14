// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #footerContainer {
  margin: auto;
  text-align: center;
  padding: 10px;
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  text-transform: uppercase;
  border-top: 2px solid #DFDFDF; /* Add a solid black border at the bottom */
  color: #A6A6A6;
  }

    /* Media queries for responsiveness */
    @media screen and (min-width: 405px) and (max-width: 550px) {
      #footerContainer {
    margin-top: 70px;
  }
}

@media screen and (min-width: 550px) {
  #footerContainer {
    margin-top: 100px;
  }
}

  @media screen and (min-width: 821px) {
  #footerContainer {
    margin-top: 140px;
  }
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
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
    }
  }
)
