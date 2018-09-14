import 'normalize.css'

import Vec2 from './leafjem/vec2'
import Mouse from './leafjem/mouse'
import { Renderable } from './leafjem/object/renderable'
import { GameObject } from './leafjem/object/game_object'
import gid from './leafjem/util/generate_id'


let mouse = new Mouse(document)

class Renderer {
	public canvas: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')
	}

	attatch = (gameObject: Renderable) => {
		gameObject.ctx = this.ctx
	}

	draw(objects) {
		for (let objectName in objects) {
			objects[objectName].draw()
		}
	}
}

// For future use
class Container {
	canvas: HTMLCanvasElement

	constructor() {
		this.canvas = document.createElement('canvas')
		document.body.appendChild(this.canvas)
	}
}

class Game {
	container: Container
	renderer: Renderer
	mouse: Mouse
	objects: Renderable[]

	constructor() {
		this.container = new Container
		this.renderer = new Renderer(this.container.canvas)
		this.mouse = new Mouse(this.container.canvas)
		this.objects = []

		this.bindEvents()
	}

	draw() {
		this.renderer.draw(this.objects)
	}

	attatch(object: Renderable) {
		this.objects[object.gid] = object
		object.game = this
		this.renderer.attatch(object)
	}

	private bindEvents() {
		this.container.canvas.addEventListener('leafjem.mouse', this.mouseEventHandler)
		this.container.canvas.addEventListener('leafjem.mouse.move', this.moveEventHandler)
		this.container.canvas.addEventListener('leafjem.mouse.press', this.pressEventHandler)
		this.container.canvas.addEventListener('leafjem.mouse.release', this.releaseEventHandler)
	}

	private mouseEventHandler = (event) => {
		if (event.detail.region !== "") {
			this.objects[event.detail.region].whileOver()
		}
	}

	private moveEventHandler = (event) => {
		if (event.detail.region !== "") {
			// Only send onHover once.
			if (this.objects[event.detail.region].hovered) {
				this.objects[event.detail.region].hovered = true
			} else {
				this.objects[event.detail.region].onHover()
				this.objects[event.detail.region].hovered = true
			}
		}
		for (let objectName in this.objects) {
			let object = this.objects[objectName]

			if (object.gid !== event.detail.region) {
				if (object.hovered) {
					object.unHover()
				}
				object.hovered = false
			} else {
				if(!object.hovered) {
					object.onHover()
				}
				object.hovered = true
			}
		}
	}

	private pressEventHandler = (event) => {
		if (event.detail.region !== "") {
			// Only send onHover once.
			if (this.objects[event.detail.region].held) {
				this.objects[event.detail.region].onPress()
			} else {
				this.objects[event.detail.region].held = true
			}
		}
		for (let objectName in this.objects) {
			let object = this.objects[objectName]

			if (object.gid !== event.detail.region) {
				object.held = false
			}
		}
	}

	private releaseEventHandler = (event) => {
		if (event.detail.region !== "") {
			// Only send onHover once.
			if (this.objects[event.detail.region].held) {
				this.objects[event.detail.region].unPress()
			} else {
				this.objects[event.detail.region].held = false
			}
		}
		for (let objectName in this.objects) {
			let object = this.objects[objectName]

			if (object.gid !== event.detail.region) {
				object.held = false
			}
		}
	}
}

class Rectangle extends Renderable {
	public game: Game

	public fill: boolean
	public fillColor: string

	public outline: boolean
	public outlineColor: string

	public hovered: boolean
	public held: boolean

	public dragging: boolean

	constructor(pos, size = new Vec2(32, 32), name: string = `Rectangle-${gid()}`, ctx?: CanvasRenderingContext2D) {
		super(pos, size, name, ctx)

		this.fill = true
		this.fillColor = '#000000'

		this.outline = false
		this.outlineColor = '#000000'
	}

	onPress = () => {
		this.fillColor = "purple"
		this.draw()
	}

	unPress = () => {
		this.fillColor = "red"
		this.draw()
	}

	onHover = () => {
		this.fillColor = "blue"
		this.draw()
	}

	unHover = () => {
		this.fillColor = "black"
		this.draw()
	}

	draw = () => {
		this.ctx.beginPath()
		this.ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y)

		if (this.fill) {
			this.ctx.fillStyle = this.fillColor
			this.ctx.fill()
		}
		if (this.outline) {
			this.ctx.strokeStyle = this.outlineColor
			this.ctx.stroke()
		}
		this.ctx.addHitRegion({id: this.gid})
		return this
	}
}

let game = new Game
let rectangle = new Rectangle(new Vec2(32, 32))
game.attatch(rectangle)
rectangle = new Rectangle(new Vec2(10, 10))
game.attatch(rectangle)
game.draw()
