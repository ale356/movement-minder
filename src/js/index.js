/**
 * The main script file of the application.
 *
 * @author Alejandro Lindström Mamani <al225vh@student.lnu.se>
 * @version 1.0.0
 */

import './components/movement-minder-timer/movement-minder-timer'
import './components/movement-minder-break-timer/movement-minder-break-timer'
import './components/movement-minder-break-notification/movement-minder-break-notification'

const mainTimerElement = document.createElement('movement-minder-timer')
const breakTimerElement = document.createElement('movement-minder-break-timer')
const breakNotificationElement = document.createElement('movement-minder-break-notification')

document.body.appendChild(mainTimerElement)
document.body.appendChild(breakTimerElement)
