/// <reference path="vec2.ts" />

namespace Leafjem {
	export class Pos extends Vec2 {
		public screen: Vec2
		public client: Vec2

		constructor(x: number, y: number, clientX: number, clientY: number) {
			super()
			this.screen = new Vec2(x, y)
			this.client = new Vec2(clientX, clientY)
		}
	}
}