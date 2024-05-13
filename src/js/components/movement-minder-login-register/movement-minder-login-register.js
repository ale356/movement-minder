// Define template.
const template = document.createElement('template');
template.innerHTML = `
<style>
/* Import Montserrat font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  #loginRegisterButton {
  /*position: absolute;*/
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
  justify-content: center; /* Add this line */
}

  #loginRegisterContainer {
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

input {
  margin-top: 10px;
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.loginRegisterButton {
  margin-top: 170px;
  margin-bottom: 130px;
}

#signUpLink {
  color: #37C59C; /* Link color */
  cursor: pointer;
}

#signUpText {
  color: #A6A6A6; /* Text color */
}

.errorMessage {
  color: red;
  margin: 30px auto;
}

  /* Media queries for responsiveness */
  @media screen and (min-width: 405px) and (max-width: 550px) {

    #closeButton {
      font-size: 50px;
      margin: 15px;
    }

    #loginRegisterContent {
    font-size: 20px; 
    padding: 30px;
    }

    .loginRegisterButton {
    margin-bottom: 100px;
    margin-top: 100px;
}

input {
  font-size: 28px;
}

button {
  font-size: 48px;
}

#loginForm svg {
  transform: scale(1.2);
}

#registerForm svg {
  transform: scale(1.2);
}

#loginRegisterButton svg {
  padding: 3px 6px;
  transform: scale(1.3);
}
  }

  @media screen and (min-width: 550px) {
    #closeButton {
      font-size: 55px;
      margin: 30px;
    }

    #loginRegisterContent {
    font-size: 24px; 
    margin: 11% auto 0px auto;
    }

    .loginRegisterButton {
      margin-top: 50px;
    margin-bottom: 50px;
}

input {
  font-size: 28px;
  width: 200px;
}

button {
  font-size: 38px;
}

span {
  font-size: 18px;
}

#loginForm svg {
  transform: scale(1.4);
}

#registerForm svg {
  transform: scale(1.4);
}

#loginRegisterButton svg {
  padding: 5px 10px;
  transform: scale(1.5);
}
  }

</style>
<button id="loginRegisterButton"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></button>
<div id="loginRegisterContainer">
<button id="closeButton">&times;</button>
  <div id="loginRegisterContent">
    <div id="loginContent">
      <h2>Login</h2>
      <div class="errorMessage" id="loginErrorMessage">Invalid username or password.</div>
      <form id="loginForm">
        <div id="userNameContainer">
          <label for="userNameInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></label>
          <input type="text" id="userNameInput" name="username" placeholder="Username" min="1" max="240" required>
        </div>
        <div id="passWordContainer">
          <label for="passWordInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg></label>
          <input type="password" id="passWordInput" name="password" placeholder="Password" min="1" max="1440" required>
        </div>
        <button class="loginRegisterButton" id="loginButton" type="submit">Login</button>
      </form>
      <span id="signUpText">Don't have an account? </span><span id="signUpLink">Sign Up</span>
    </div>
    <div id="registerContent">
      <h2>Register</h2>
      <div class="errorMessage" id="registerErrorMessage">Invalid credentials.</div>
      <form id="registerForm">
        <div id="userNameContainer">
          <label for="userNameInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></label>
          <input type="text" id="userNameInput" name="username" placeholder="Username" min="1" max="240" required>
        </div>
        <div id="emailContainer">
          <label for="emailInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></label>
          <input type="text" id="emailInput" name="email" placeholder="Email" min="1" max="240" required>
        </div>
        <div id="passWordContainer">
          <label for="passWordInput"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a6a6a6" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg></label>
          <input type="password" id="passWordInput" name="password" placeholder="Password" min="1" max="1440" required>
        </div>
        <button class="loginRegisterButton" id="registerButton" type="submit">Register</button>
      </form>
    </div>
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
     * Reference to the login form.
     *
     * @type {HTMLButtonElement}
     */
    #loginForm;

    /**
     * Reference to the register form.
     *
     * @type {HTMLButtonElement}
     */
    #registerForm;

    /**
     * Reference to the login error message container.
     *
     * @type {HTMLDivElement}
     */
    #loginErrorMessageContainer;

    /**
     * Reference to the register error message container.
     *
     * @type {HTMLDivElement}
     */
    #registerErrorMessageContainer;

    /**
     * Reference to the sign up link.
     *
     * @type {HTMLSpanElement}
     */
    #signUpLink;

    /**
     * Reference to the login content container.
     *
     * @type {HTMLDivElement}
     */
    #loginContentContainer;

    /**
     * Reference to the register content container.
     *
     * @type {HTMLDivElement}
     */
    #registerContentContainer;

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
      this.#loginForm = this.shadowRoot.querySelector('#loginForm')
      this.#registerForm = this.shadowRoot.querySelector('#registerForm')
      this.#loginErrorMessageContainer = this.shadowRoot.querySelector('#loginErrorMessage')
      this.#registerErrorMessageContainer = this.shadowRoot.querySelector('#registerErrorMessage')
      this.#signUpLink = this.shadowRoot.querySelector('#signUpLink')
      this.#loginContentContainer = this.shadowRoot.querySelector('#loginContent')
      this.#registerContentContainer = this.shadowRoot.querySelector('#registerContent')

      // Add event listeners.
      this.#loginRegisterButton.addEventListener('click', () => this.#toggleLoginRegister());
      this.#closeButton.addEventListener('click', () => this.#toggleLoginRegister());
      this.#loginForm.addEventListener('submit', (event) => this.#handleSubmitLogin(event));
      this.#registerForm.addEventListener('submit', (event) => this.#handleSubmitRegister(event));
      this.#signUpLink.addEventListener('click', () => this.#showRegisterForm());
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {
      // Hide elements from the user.
      this.#loginRegisterContainer.setAttribute('hidden', '')
      this.#loginErrorMessageContainer.setAttribute('hidden', '')
      this.#registerErrorMessageContainer.setAttribute('hidden', '')
      this.#registerContentContainer.setAttribute('hidden', '')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }

    /**
     * Shows the loginRegister popup window.
     */
    #toggleLoginRegister() {
      if (this.#loginRegisterContainer.hasAttribute('hidden')) {
        // This logic runs when you open the popup window.
        this.#loginRegisterContainer.removeAttribute('hidden');
        this.#loginContentContainer.removeAttribute('hidden')
        this.#loginErrorMessageContainer.setAttribute('hidden', '')

      } else {
        // This logic runs when you close the popup window.
        this.#loginRegisterContainer.setAttribute('hidden', '');
        this.#registerContentContainer.setAttribute('hidden', '')
      }
    }

    /**
     * Handles the event submit on the login form.
     * @param event
     */
    async #handleSubmitLogin(event) {

      // Prevent the default form submission behavior.
      event.preventDefault();
      console.log('submited login')

      // Get the form data.
      const formData = new FormData(event.target);

      // Convert the form data to JSON.
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      // Make a POST request to the server API.
      try {
        const response = await fetch('https://movement-minder-restful-api.onrender.com/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        });

        if (response.ok) {
          // Handle successful login.
          console.log('Login successful');
          console.log(response)

          // Get the JWT token from the response.
          // eslint-disable-next-line camelcase
          const { access_token } = await response.json();

          // Save the JWT token in the browser's local storage.
          localStorage.setItem('accessToken', access_token);

          // Redirect or perform other actions.
          this.#loginErrorMessageContainer.setAttribute('hidden', '')
          this.#loginRegisterContainer.setAttribute('hidden', '')
        } else {
          // Handle error response.
          console.error('Login failed:', response.status);
          // Display error message to the user.
          this.#loginErrorMessageContainer.removeAttribute('hidden')
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network errors
      }
    }

    /**
     * Handles the event submit on the register form.
     * @param event
     */
    async #handleSubmitRegister(event) {

      // Prevent the default form submission behavior.
      event.preventDefault();
      console.log('submited register')

      // Get the form data.
      const formData = new FormData(event.target);

      // Convert the form data to JSON.
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      // Make a POST request to the server API.
      try {
        const response = await fetch('https://movement-minder-restful-api.onrender.com/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        });

        if (response.ok) {
          // Handle successful login.
          console.log('Register successful');
          console.log(response)
          // Redirect or perform other actions.
          this.#registerErrorMessageContainer.setAttribute('hidden', '')
          this.#registerContentContainer.setAttribute('hidden', '')
          this.#loginContentContainer.removeAttribute('hidden')
        } else {
          // Handle error response.
          console.error('Register failed:', response.status);
          // Display error message to the user.
          this.#registerErrorMessageContainer.removeAttribute('hidden')
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network errors
      }
    }

    /**
     * Shows the Register form.
     */
    #showRegisterForm() {
      // Hide the login form and content.
      this.#loginContentContainer.setAttribute('hidden', '')

      // Show the register form instead.
      this.#registerContentContainer.removeAttribute('hidden')
    }
  }
);
