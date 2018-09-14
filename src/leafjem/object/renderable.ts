import { GameObject } from './game_object'
import Vec2 from '../vec2'
import gid from '../util/generate_id'

export interface RenderableInterface extends GameObject {
	name: string
	pos: Vec2
	size: Vec2
	ctx?: CanvasRenderingContext2D
	game?: object

	hovered: boolean
	held: boolean

	whileOver()

	onPress()

	unPress()

	onHover()

	unHover()

	draw()
}

export class Renderable implements RenderableInterface {
	gid: string

	name: string
	pos: Vec2
	size: Vec2
	ctx?: CanvasRenderingContext2D
	game?: object

	hovered: boolean
	held: boolean

	constructor(pos, size, name = `Renderable-${gid()}`, ctx?: CanvasRenderingContext2D) {
		this.name = name
		this.gid = name

		this.pos = pos
		this.size = size

		this.ctx = ctx

		this.hovered = false
		this.held = false
	}

	whileOver = () => {}

	onPress = () => {}
	unPress = () => {}

	onHover = () => {}
	unHover = () => {}

	draw = () => {}
}

// export interface Renderable extends RenderableInterface {
// 	constructor(name: string, x: number, y: number, width: number, height: number, ctx?) {
// 		this.name = name
// 		this.pos = new Vec2(x, y)
// 		this.size = new Vec2(width, height)
// 		this.ctx = ctx
// 	}
// }