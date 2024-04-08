/**
 * The movement minder timer web component module.
 *
 * @author Alejandro Lindström Mamani <al225vh@student.lnu.se>
 * @version 1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
</style>
<h1>MovementMinder Timer</h1>
 `

customElements.define('movement-minder-timer',
  /**
   * Represents a MovementMinder timer element.
   */
  class extends HTMLElement {
    /**
     * Reference to the start button.
     *
     * @type {HTMLButtonElement}
     */
    #startButton

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get references to elements to change.

      // Add event listeners.

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
