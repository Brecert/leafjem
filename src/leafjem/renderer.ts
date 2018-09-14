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