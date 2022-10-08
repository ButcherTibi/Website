
// export class WebsiteURLs {
// 	static leafs = '/leafs'
// 	static rain = '/rain'
// }

export enum DisplayFormat {
	desktop,
	mobile
}

export class Interval {
	min: number
	max: number

	constructor(new_min?: number, new_max?: number) {
		this.min = new_min ?? 0
		this.max = new_max ?? 1
	}
}

export function blend(min: number = 0, max: number = 1, alpha: number)
{
	return min + ((max - min) * alpha)
}

export const jitter = (min: number = 0, max: number = 1) => {
	return min + ((max - min) * Math.random())
}

export function clearAnimations(elem: Element)
{
	elem.getAnimations().forEach(anim => anim.cancel())
}