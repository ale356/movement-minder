/**
 * The main script file of the application.
 *
 * @author Alejandro Lindström Mamani <al225vh@student.lnu.se>
 * @version 1.0.0
 */

import './components/movement-minder-timer/movement-minder-timer'
import './components/movement-minder-break-timer/movement-minder-break-timer'

const mainTimerElement = document.createElement('movement-minder-timer')
const breakTimerElement = document.createElement('movement-minder-break-timer')

document.body.appendChild(mainTimerElement)
document.body.appendChild(breakTimerElement)
