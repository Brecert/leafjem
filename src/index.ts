import 'normalize.css'

import Leafjem from './leafjem/Leafjem'

let mouse = new Leafjem.Mouse()

window.addEventListener('lbpl.mouse.press', event => {
	console.log(event)
})


