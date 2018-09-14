import Vec2 from '../vec2'
import gid from '../util/generate_id'

export interface GameObject {
	gid: string
	pos: Vec2
}