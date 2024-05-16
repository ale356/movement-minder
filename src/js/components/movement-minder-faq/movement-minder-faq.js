// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #faqButton {
  /*position: absolute;*/
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
  justify-content: center; /* Add this line */
}

  #faqContainer {
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

#faqContent {
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

  h2, h3 {
    color: #37C59C;
  }

  p, li {
    color: #A6A6A6;
    text-transform: none;
    text-align: left;
  }

  span {
    color: #37C59C;
  }

    /* Media queries for responsiveness */
    @media screen and (min-width: 405px) and (max-width: 550px) {

#closeButton {
  font-size: 50px;
  margin: 15px;
}

#faqContent {
font-size: 20px; 
padding: 30px;
}

#faqButton svg {
  padding: 3px 6px;
  transform: scale(1.3);
}

}

@media screen and (max-width: 500px) {
#faqContent {
margin-bottom: 300px;
}
}

@media screen and (min-width: 550px) {
#closeButton {
  font-size: 55px;
  margin: 30px;
}

#faqContent {
font-size: 20px; 
padding: 40px;
}

#faqButton svg {
  padding: 5px 10px;
  transform: scale(1.5);
}
}
@media screen and (min-width: 750px) {
#faqContent {
margin-bottom: 600px;
}
}

@media screen and (min-width: 850px) {
#faqContent {
margin-top: 100px;
margin-bottom: 50px;
}
}
</style>
<button id="faqButton"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="12.5" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg></button>
<div id="faqContainer">
  <button id="closeButton">&times;</button>
  <div id="faqContent">
    <h2>FAQ</h2>

    <h3>How to Use</h3>
    <ol>
      <li>Click on the "Start" button to begin the 30-minute timer.</li>
      <li>After 30 minutes, a notification/message will remind you to take a 5-minute walking break.</li>
      <li>During the break, go for a walk for 5 minutes.</li>
    </ol>

    <h3>Scientific Basis</h3>
    <p>This app is based on a scientific study conducted by Columbia University, which suggests that taking a 5-minute walk every half hour can counteract the negative health effects of prolonged sitting. The study, led by Keith Diaz, PhD, found that regular short breaks from sitting can improve blood sugar levels, blood pressure, and overall well-being. <a href="https://www.cuimc.columbia.edu/news/rx-prolonged-sitting-five-minute-stroll-every-half-hour" target="_blank">Read more here.</a></p>

    <h3>Features</h3>
    <ul>
      <li>30-minute main timer.</li>
      <li>5-minute break timer with walking reminder.</li>
      <li>Real-time display of timer.</li>
      <li>Configure the timer settings based on your preferences.</li>
      <li>Notification reminders for breaks.</li>
      <li>Audio alerts when timers end.</li>
      <li>Account creation for personalized statistics on your sitting and break times.</li>
    </ul>
  </div>
</div>
`

customElements.define('movement-minder-faq',
  /**
   * Represents a MovementMinder faq element.
   */
  class extends HTMLElement {
    /**
     * Reference to the faq button.
     *
     * @type {HTMLButtonElement}
     */
    #faqButton

    /**
     * Reference to the faq container.
     *
     * @type {HTMLDivElement}
     */
    #faqContainer

    /**
     * Reference to the close button.
     *
     * @type {HTMLButtonElement}
     */
    #closeButton

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
      this.#faqButton = this.shadowRoot.querySelector('#faqButton')
      this.#faqContainer = this.shadowRoot.querySelector('#faqContainer')
      this.#closeButton = this.shadowRoot.querySelector('#closeButton')


      // Add event listeners.
      this.#faqButton.addEventListener('click', () => this.#toggleFaq())
      this.#closeButton.addEventListener('click', () => this.#toggleFaq())
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {
      // Hide elements from the user.
      this.#faqContainer.setAttribute('hidden', '')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }

    /**
     * Shows the faq popup window.
     */
    #toggleFaq() {
      if (this.#faqContainer.hasAttribute('hidden')) {
        this.#faqContainer.removeAttribute('hidden')
      } else {
        this.#faqContainer.setAttribute('hidden', '')
      }
    }
  }
)
