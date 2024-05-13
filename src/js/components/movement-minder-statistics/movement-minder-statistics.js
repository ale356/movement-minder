import { jwtDecode } from 'jwt-decode'

// Define template.
const template = document.createElement('template')
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
  font-size: 50px;
  margin: 15px;
}

#statisticsContent {
font-size: 20px; 
padding: 30px;
}

.loginRegisterButton {
margin-bottom: 200px;
}

#statisticsButton svg {
  padding: 3px 6px;
  transform: scale(1.3);
}

}

@media screen and (min-width: 550px) {
#closeButton {
  font-size: 55px;
  margin: 30px;
}

#statisticsContent {
font-size: 20px; 
padding: 40px;
}

#statisticsButton svg {
  padding: 5px 10px;
  transform: scale(1.5);
}
}

</style>
<button id="statisticsButton"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg></button>
<div id="statisticsContainer">
<button id="closeButton">&times;</button>
  <div id="statisticsContent">
    <h2>Statistics</h2>
    <div id="notLoggedIn">
      <p>Please Log In To See Data.</p>
    </div>
    <div id="loggedIn">
      <p>Total Sedentary Time: <span id="sedentaryTime"></></p>
      <p>Total Break Time: <span id="breakTime"></></p>
    </div>
  </div>
</div>
`

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
    #statisticsButton

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
    #closeButton

    /**
     * Reference to the not logged in container.
     *
     * @type {HTMLDivElement}
     */
    #notLoggedInContainer

    /**
     * Reference to the logged in container.
     *
     * @type {HTMLDivElement}
     */
    #loggedInContainer

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
      this.#statisticsButton = this.shadowRoot.querySelector('#statisticsButton')
      this.#statisticsContainer = this.shadowRoot.querySelector('#statisticsContainer')
      this.#sedentaryTimeSpan = this.shadowRoot.querySelector('#sedentaryTime')
      this.#breakTimeSpan = this.shadowRoot.querySelector('#breakTime')
      this.#closeButton = this.shadowRoot.querySelector('#closeButton')
      this.#notLoggedInContainer = this.shadowRoot.querySelector('#notLoggedIn')
      this.#loggedInContainer = this.shadowRoot.querySelector('#loggedIn')

      // Add event listeners.
      this.#statisticsButton.addEventListener('click', () => this.#toggleStatistics())
      this.#closeButton.addEventListener('click', () => this.#toggleStatistics())
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback() {
      // Hide elements from the user.
      this.#statisticsContainer.setAttribute('hidden', '')
      this.#loggedInContainer.setAttribute('hidden', '')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback() {
    }

    /**
     * Make a GET fetch request to get the users activity data from the server.
     *
     * @param {object} jwtToken - A JWT access token.
     * @returns {object} a timeTracker object.
     */
    async #fetchUserActivityData(jwtToken) {
      try {
        // Get the payload data.
        const payLoadData = jwtDecode(jwtToken)
        console.log(payLoadData)

        // Construct the URL for the GET request.
        const url = `https://movement-minder-restful-api.onrender.com/api/v1/timeTrackers/${payLoadData.timeTrackerId}`

        // Make the GET request with the JWT token in the Authorization header.
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })

        if (response.ok) {
          // Handle successful response
          const data = await response.json()
          console.log('TimeTracker data:', data)
          // You can perform further actions with the retrieved data here
          return data
        } else {
          // Handle error response
          throw new Error('Failed to fetch timeTracker data')
        }
      } catch (error) {
        // Handle fetch errors
        console.error('Error fetching timeTracker data:', error)
      }
    }

    /**
     * Checks if a user is logged in.
     *
     * @returns {boolean} depending if the user is logged in or not.
     */
    #isLoggedIn() {
      if (this.#getJwtTokenFromLocalStorage !== undefined) {
        return true
      } else {
        return false
      }
    }

    /**
     * Show user data in statistics popup window.
     */
    async #showUserData() {
      // Check if the user is logged in.
      const userIsLoggedIn = this.#isLoggedIn()
      if (userIsLoggedIn) {
        // Fetch the user data from the server.
        const jwtToken = this.#getJwtTokenFromLocalStorage()
        const userData = await this.#fetchUserActivityData(jwtToken)
        // Show the data for the user.
        this.#sedentaryTimeSpan.textContent = userData.totalSedentaryTime
        this.#breakTimeSpan.textContent = userData.totalBreakTime

        // Hide the not logged in container.
        this.#notLoggedInContainer.setAttribute('hidden', '')
        // Show the logged in container.
        this.#loggedInContainer.removeAttribute('hidden', '')
      } else {
        // Hide the logged in container.
        this.#loggedInContainer.setAttribute('hidden', '')
        // Show the not logged in container.
        this.#notLoggedInContainer.removeAttribute('hidden', '')
      }
    }

    /**
     * Gets the JWT token from the local storage.
     *
     * @returns {object} a JWT token.
     */
    #getJwtTokenFromLocalStorage() {
      // Retrieve the JWT token from local storage.
      const jwtToken = localStorage.getItem('accessToken')
      return jwtToken
    }

    /**
     * Shows the statistics popup window.
     */
    #toggleStatistics() {
      if (this.#statisticsContainer.hasAttribute('hidden')) {
        this.#statisticsContainer.removeAttribute('hidden')
        // Show user data from the server.
        this.#showUserData()
      } else {
        this.#statisticsContainer.setAttribute('hidden', '')
      }
    }
  }
)
