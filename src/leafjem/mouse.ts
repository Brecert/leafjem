import Pos from './pos'
import Button from './button'

export default class Mouse {
	public pos: Pos
	public region: string
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
		this.region = ""
		this.buttons = [null, null, null]

		this.anyEvent = new CustomEvent('leafjem.mouse', { detail: this })
		this.moveEvent = new CustomEvent('leafjem.mouse.move', { detail: this })
		this.pressEvent = new CustomEvent('leafjem.mouse.press', { detail: this })
		this.releaseEvent = new CustomEvent('leafjem.mouse.release', { detail: this })
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

		this.region = event.region

		this.target.dispatchEvent(this.moveEvent)
		this.update()
	}

	private downHandler = (event) => {
		if (this.buttons[event.button] != null) {
			this.buttons[event.button].update(event)
		} else {
			this.buttons[event.button] = new Button(event)
		}

		this.region = event.region

		this.target.dispatchEvent(this.pressEvent)
		this.update()
	}

	private upHandler = (event) => {
		// NOTE: Don't delete, delete is slow.
		this.buttons[event.button] = null

		this.region = event.region

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