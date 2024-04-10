// Define template.
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Add your styles here */
    .notification {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 5px;
      padding: 10px 20px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 9999; /* Ensure it's above other content */
    }
  </style>
<div id="notificationContainer">
    <p id="notificationMessage">Time to take a walking break.</p>
  </div>
`;

customElements.define('movement-minder-break-notification',
  /**
   * Represents a MovementMinder break notification element.
   */
  class extends HTMLElement {
    /**
     * Reference to the notification container.
     *
     * @type {HTMLDivElement}
     */
    #notificationContainer;

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
      this.#notificationContainer = this.shadowRoot.querySelector('#notificationContainer');

      // Add event listeners.
      this.#notificationContainer.addEventListener('click', () => console.log('clicked'));
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {

      // Hide the element from the user.
      this.setAttribute('hidden', '')

      // Listen for the custom event at the body level.
      document.body.addEventListener('startBreak', () => this.#handleStartBreakEvent());
    }

    /**
     * Handle the "startBreak" event.
     */
    #handleStartBreakEvent() {
      console.log('Received startBreak event');
      this.removeAttribute('hidden', '')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }
  }
);
