// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #loginRegisterButton {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
  justify-content: center; /* Add this line */
}

  #loginRegisterContainer {
  /*margin: 100px auto;*/
  max-width: 400px;
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

#loginRegisterContent {
  background-color: #fefefe;
  margin: 15% auto 0px auto; /* 15% from the top and centered */
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
    margin-bottom: 40px;
  }

  p {
    color: #A6A6A6;
  }

  span {
    color: #37C59C;
  }

  label {
  font-size: 18px;
  margin: 10px;
}

input[type="text"] {
  margin-top: 10px;
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#confirmButton {
  margin-top: 130px;
  margin-bottom: 170px;
}

#signupLink {
  color: #37C59C; /* Link color */
  cursor: pointer;
}

#signupText {
  color: #A6A6A6; /* Text color */
}

</style>
<button id="loginRegisterButton"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></button>
<div id="loginRegisterContainer">
<button id="closeButton">&times;</button>
  <div id="loginRegisterContent">
    <h2>Login</h2>
    <form id="loginForm">
      <div id="userNameContainer">
        <label for="userNameInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></label>
        <input type="text" id="userNameInput" name="userName" placeholder="Username" min="1" max="240" required>
      </div>
      <div id="passWordContainer">
        <label for="passWordInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg></label>
        <input type="text" id="passWordInput" name="passWord" placeholder="Password" min="1" max="1440" required>
      </div>
      <button id="confirmButton" type="submit">Login</button>
    </form>
    <span id="signupText">Don't have an account? </span><span id="signupLink">Sign Up</span>
  </div>
</div>
`;

customElements.define('movement-minder-login-register',
  /**
   * Represents a MovementMinder login-register element.
   */
  class extends HTMLElement {
    /**
     * Reference to the loginRegister button.
     *
     * @type {HTMLButtonElement}
     */
    #loginRegisterButton;

    /**
     * Reference to the loginRegister container.
     *
     * @type {HTMLDivElement}
     */
    #loginRegisterContainer

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
      this.#loginRegisterButton = this.shadowRoot.querySelector('#loginRegisterButton')
      this.#loginRegisterContainer = this.shadowRoot.querySelector('#loginRegisterContainer')
      this.#sedentaryTimeSpan = this.shadowRoot.querySelector('#sedentaryTime')
      this.#breakTimeSpan = this.shadowRoot.querySelector('#breakTime')
      this.#closeButton = this.shadowRoot.querySelector('#closeButton')

      // Add event listeners.
      this.#loginRegisterButton.addEventListener('click', () => this.#toggleLoginRegister());
      this.#closeButton.addEventListener('click', () => this.#toggleLoginRegister());
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {
      // Hide elements from the user.
      this.#loginRegisterContainer.setAttribute('hidden', '')

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
     * Show user data in loginRegister popup window.
     */
    #showUserData() {
      // Fetch the user data from the server.

      // Show the data for the user.
    }

    /**
     * Shows the loginRegister popup window.
     */
    #toggleLoginRegister() {
      if (this.#loginRegisterContainer.hasAttribute('hidden')) {
        this.#loginRegisterContainer.removeAttribute('hidden');
        // Show user data from the server.

      } else {
        this.#loginRegisterContainer.setAttribute('hidden', '');
      }
    }
  }
);
