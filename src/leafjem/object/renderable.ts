import { GameObject } from './game_object'
import Vec2 from '../vec2'


export interface Renderable extends GameObject {
	public name: string = "Renderable"
	public pos: Vec2
	public size: Vec2
	public ctx?: CanvasRenderingContext2D

	public hovered: boolean = false

	public onHover()

	public unHover()

	public draw()
}

// export interface Renderable extends RenderableInterface {
// 	constructor(name: string, x: number, y: number, width: number, height: number, ctx?) {
// 		this.name = name
// 		this.pos = new Vec2(x, y)
// 		this.size = new Vec2(width, height)
// 		this.ctx = ctx
// 	}
// }