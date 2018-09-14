import 'normalize.css'

import Vec2 from './leafjem/vec2'
import Mouse from './leafjem/mouse'
import { Renderable } from './leafjem/object/renderable'
import { GameObject } from './leafjem/object/game_object'

let mouse = new Mouse(document)

class Renderer {
	public canvas: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')
	}

	attatch = (gameObject: Rectangle) => {
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
	objects: Rectangle[]

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

	attatch(object: Rectangle) {
		this.objects[object.name] = object
		this.renderer.attatch(object)
	}

	private bindEvents() {
		this.container.canvas.addEventListener('leafjem.mouse', this.mouseEventHandler)
	}

	// Any Leafjem mouse event
	private mouseEventHandler = (event) => {
		if (event.detail.region !== "") {
			// Only send onHover once.
			if (this.objects[event.detail.region].hovered) {
				this.objects[event.detail.region].hovered = true
				this.objects[event.detail.region].onHover()
			} else {
				this.objects[event.detail.region].hovered = true
			}
		}
		for (let objectName in this.objects) {
			let object = this.objects[objectName]

			if (object.name !== event.detail.region) {
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
}

class Rectangle implements Renderable {
	public ctx?: CanvasRenderingContext2D
	public name: string

	public pos: Vec2
	public size: Vec2
	public fill: boolean
	public fillColor: string
	public outline: boolean
	public outlineColor: string
	public hovered: boolean

	constructor(x: number, y: number, width: number = 32, height: number = 32 ctx?: CanvasRenderingContext2D, name: string = "Rectangle") {
		this.ctx = ctx
		this.name = name

		this.pos = new Vec2(x, y)
		this.size = new Vec2(width, height)

		this.fill = true
		this.fillColor = '#000000'

		this.outline = false
		this.outlineColor = '#000000'

		this.hovered = false
	}

	onHover() {
		this.fillColor = "blue"
		this.draw()
	}

	unHover() {
		this.fillColor = "black"
		this.draw()
	}

	draw() {
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
		this.ctx.addHitRegion({id: this.name})
		return this
	}
}

let game = new Game
let rectangle = new Rectangle(10, 10)
game.attatch(rectangle)
game.draw()
