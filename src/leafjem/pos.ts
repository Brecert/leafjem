import Vec2 from './vec2'


export default class Pos extends Vec2 {
	public screen: Vec2
	public client: Vec2

	constructor(x: number, y: number, clientX: number, clientY: number) {
		super(x, y)
		this.screen = new Vec2(x, y)
		this.client = new Vec2(clientX, clientY)
	}
}
