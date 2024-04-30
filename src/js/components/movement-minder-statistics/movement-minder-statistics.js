// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #statisticsButton {
  /*position: absolute;*/
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
  justify-content: center; /* Add this line */
}

  #statisticsContainer {
  /*margin: 100px auto;*/
  text-align: center;
  font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  border-radius: 10px;
  background-color: white;
  text-transform: uppercase;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
}

#statisticsContent {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 80%; /* Could be more or less, depending on screen size */
  position: relative; /* Ensure position relative for absolute positioning of close button */

}

#closeButton {
  position: absolute;
  right: 5px; /* Adjust the distance from the right */
  font-size: 40px; /* Increase the font size for a bigger button */
  width: 40px; /* Increase the width for a bigger button */
  height: 40px; /* Increase the height for a bigger button */
  background: none;
  border: none;
  cursor: pointer;
  color: #DFDFDF;
  display: flex; /* Use flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

  button {
    font-size: 36px;
    padding: 10px 20px;
    margin: 10px;
    color: white;
    background-color: #37C59C;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    font-family: 'Montserrat', sans-serif; /* Specify Montserrat font family */
  font-weight: 700; /* Specify bold (700) font weight */
  }

  button:hover {
    opacity: 0.7;
  }

  h2 {
    color: #37C59C;
  }

  p {
    color: #A6A6A6;
  }

  span {
    color: #37C59C;
  }

    /* Media queries for responsiveness */
    @media screen and (min-width: 405px) and (max-width: 550px) {

#closeButton {
  font-size: 60px;
  margin: 15px;
}

#statisticsContent {
font-size: 24px; 
padding: 40px;
}

.loginRegisterButton {
margin-bottom: 200px;
}

#statisticsButton svg {
  padding: 6px 12px;
  transform: scale(1.6);
}

}

@media screen and (min-width: 550px) {
#closeButton {
  font-size: 90px;
  margin: 30px;
}

#statisticsContent {
font-size: 44px; 
padding: 40px;
}

#statisticsButton svg {
  padding: 10px 20px;
  transform: scale(2);
}
}

</style>
<button id="statisticsButton"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg></button>
<div id="statisticsContainer">
<button id="closeButton">&times;</button>
  <div id="statisticsContent">
    <h2>Statistics</h2>
    <p>Total Sedentary Time: <span id="sedentaryTime">150</></p>
    <p>Total Break Time: <span id="breakTime">30</></p>
  </div>
</div>
`;

customElements.define('movement-minder-statistics',
  /**
   * Represents a MovementMinder statistics element.
   */
  class extends HTMLElement {
    /**
     * Reference to the statistics button.
     *
     * @type {HTMLButtonElement}
     */
    #statisticsButton;

    /**
     * Reference to the statistics container.
     *
     * @type {HTMLDivElement}
     */
    #statisticsContainer

    /**
     * Reference to the sedentary time span element.
     *
     * @type {HTMLSpanElement}
     */
    #sedentaryTimeSpan

    /**
     * Reference to the break time span element.
     *
     * @type {HTMLSpanElement}
     */
    #breakTimeSpan

    /**
     * Reference to the close button.
     *
     * @type {HTMLButtonElement}
     */
    #closeButton;

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
      this.#statisticsButton = this.shadowRoot.querySelector('#statisticsButton')
      this.#statisticsContainer = this.shadowRoot.querySelector('#statisticsContainer')
      this.#sedentaryTimeSpan = this.shadowRoot.querySelector('#sedentaryTime')
      this.#breakTimeSpan = this.shadowRoot.querySelector('#breakTime')
      this.#closeButton = this.shadowRoot.querySelector('#closeButton')

      // Add event listeners.
      this.#statisticsButton.addEventListener('click', () => this.#toggleStatistics());
      this.#closeButton.addEventListener('click', () => this.#toggleStatistics());
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {
      // Hide elements from the user.
      this.#statisticsContainer.setAttribute('hidden', '')

    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }

    /**
     * Make a GET fetch request to get the users MovementMinder data from the server.
     */
    #fetchUserData() {
      // Fetch the user data from the server.
    }


    /**
     * Show user data in statistics popup window.
     */
    #showUserData() {
      // Fetch the user data from the server.

      // Show the data for the user.
    }

    /**
     * Shows the statistics popup window.
     */
    #toggleStatistics() {
      if (this.#statisticsContainer.hasAttribute('hidden')) {
        this.#statisticsContainer.removeAttribute('hidden');
        // Show user data from the server.

      } else {
        this.#statisticsContainer.setAttribute('hidden', '');
      }
    }
  }
);
