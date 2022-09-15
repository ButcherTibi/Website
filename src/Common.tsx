
export function blend(min: number = 0, max: number = 1, alpha: number)
{
	return min + ((max - min) * alpha)
}

export const jitter = (min: number = 0, max: number = 1) => {
	return min + ((max - min) * Math.random())
}