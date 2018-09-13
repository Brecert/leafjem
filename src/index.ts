import 'normalize.css'

// const NoSuchObject = new Error(`TypeError: No such object`); 
// class Optional<O> {
// 	public exists: boolean
// 	private object?: O

// 	constructor(object?: O) {
// 		this.exists = false
// 		this.object = object
// 	}

// 	get get() {
// 		let object = null
// 		try {
// 	 		object = this.object
// 	 		if (object === null) {
// 				throw NoSuchObject
// 	 		}
// 	 		return object
// 		}
// 		catch(error) {
// 			throw NoSuchObject
// 		}

// 		return object
// 	}
// }

namespace Leafjem {
	export class Vec2 {
		public x: number = 0
		public y: number = 0

		constructor(x: number = 0, y: number = 0) {
			this.x = x
			this.y = y
		}
	}

	export class Pos extends Vec2 {
		public screen: Vec2
		public client: Vec2

		constructor(x: number, y: number, clientX: number, clientY: number) {
			super()
			this.screen = new Vec2(x, y)
			this.client = new Vec2(clientX, clientY)
		}
	}

	export class Button {
		public pos: Pos
		public held: boolean
		public pressed: boolean
		public event: MouseEvent

		constructor(event: MouseEvent) {
			this.event = event
			this.pressed = true
			this.held = false
			this.pos = new Pos(event.screenX, event.screenY, event.clientX, event.clientY)
		}

		get screen() {
			return this.pos.screen
		}

		get client() {
			return this.pos.client
		}

		update(event?: MouseEvent) {
			if (event) {
				this.pos = new Pos(event.screenX, event.screenY, event.clientX, event.clientY)
				this.event = event
			} else {
				if (this.pressed) {
					this.pressed = false
					this.held = true
				}
			}
			return this
		}
	}

	export class Mouse {
		public pos: Pos
		public buttons?: Button[]
		private target: EventTarget
		private anyEvent: CustomEvent
		private moveEvent: CustomEvent
		private pressEvent: CustomEvent
		private releaseEvent: CustomEvent

		constructor(target: EventTarget = window) {
			this.target = target

			this.target.addEventListener('mousemove', this.moveHandler);
			this.target.addEventListener('mousedown', this.downHandler);
			this.target.addEventListener('mouseup', this.upHandler);

			this.pos = new Pos(0, 0, 0, 0)
			this.buttons = [null, null, null]

			this.anyEvent = new CustomEvent('lbpl.mouse', { detail: this })
			this.moveEvent = new CustomEvent('lbpl.mouse.move', { detail: this })
			this.pressEvent = new CustomEvent('lbpl.mouse.press', { detail: this })
			this.releaseEvent = new CustomEvent('lbpl.mouse.release', { detail: this })
		}

		// Helpers for basic buttons
		get primary() {
			return this.buttons[0]
		}

		get secondary() {
			return this.buttons[2]
		}

		get middle() {
			return this.buttons[1]
		}

		// Helpers for pos
		get screen() {
			return this.pos.screen
		}

		get client() {
			return this.pos.client
		}

		// Destroy
		// Note: Does not actually destroy.
		// Todo: Remove mouse events
		destroy = () => {
			this.target.removeEventListener('mousemove', this.moveHandler)
			this.target.removeEventListener('mousedown', this.downHandler)
			this.target.removeEventListener('mouseup', this.upHandler)
		}

		// Updaters
		private moveHandler = (event) => {
			this.pos = new Pos(event.x, event.y, event.clientX, event.clientY)
			this.target.dispatchEvent(this.moveEvent)

			this.update()
		}

		private downHandler = (event) => {
			if (this.buttons[event.button] != null) {
				this.buttons[event.button].update(event)
			} else {
				this.buttons[event.button] = new Button(event)
			}

			this.target.dispatchEvent(this.pressEvent)
			this.update()
		}

		private upHandler = (event) => {
			// NOTE: Don't delete, delete is slow.
			this.buttons[event.button] = null

			this.target.dispatchEvent(this.releaseEvent)
			this.update()
		}

		update() {
			for (let button of this.buttons) {
				if (button) {
					button.update()
				}
			}
			this.target.dispatchEvent(this.anyEvent)
			return this
		}
	}
}



let mouse = new Leafjem.Mouse()

window.addEventListener('lbpl.mouse.press', event => {
	console.log(event)
})


