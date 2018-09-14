import { GameObject } from './game_object'

export interface Renderable extends GameObject {
	draw(): this
}