/// <reference path="pos.ts" />

namespace Leafjem {
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
}