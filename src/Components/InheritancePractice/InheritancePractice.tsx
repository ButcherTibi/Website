import React, { useEffect } from "react";


class Vector extends Array<number> {
	pop(): number | undefined {
		throw new Error('unsupported')
	}

	push(..._items: number[]): number {
		throw new Error('unsupported')
	}

	add(vec: Vector) {
		for (let i = 0; i < this.length; i++) {
			this[i] += vec[i]
		}
	}

	magnitude(): number {
		let sum = this.reduce((prev, component) => {
			return prev + Math.pow(component, 2)
		}, 0)

		return Math.sqrt(sum)
	}

	toString(): string {
		let result = ''
		for (let i = 0; i < this.length; i++) {
			result += `${this[i]}`

			if (i < this.length - 1) {
				result += ', '
			}
		}

		return `[${result}]`
	}
}


class Components2D extends Vector {
	get x(): number {
		return this[0]
	}

	get y(): number {
		return this[1]
	}

	set x(value) {
		this[0] = value
	}

	set y(value) {
		this[1] = value
	}
}


class Vector2D extends Components2D {
	constructor(new_x = 0, new_y = 0) {
		super(new_x, new_y)
	}
}


class Vector3D extends Components2D {
	constructor(new_x = 0, new_y = 0, new_z = 0) {
		super(new_x, new_y, new_z)
	}

	get z(): number {
		return this[2]
	}

	set z(value) {
		this[2] = value
	}
}


const InheritancePractice = () => {
	useEffect(() => {
		console.clear()

		let vec = new Vector2D(0, 0)
		console.log(`Vector2D = ${new Vector2D(1, 2)}`)
		console.log(`Vector3D = ${new Vector3D(1, 2, 3)}`)

		let vec3 = new Vector3D(0, 1, 2)
		console.log(`x = ${vec3.x}`)
		console.log(`y = ${vec3.y}`)
		console.log(`z = ${vec3.z}`)
		
		vec = new Vector2D(1, 1)
		vec.add(new Vector(1, 1))
		console.log(`add = ${vec}`)

		vec = new Vector2D(0, 0)
		vec.x = 3
		vec.y = 5
		console.log(`x, y assign ${vec}`)

		vec = new Vector2D(2, 2)
		console.log(`magnitude 2D = ${vec.magnitude()}`)
	}, [])

	return <p>InheritancePractice</p>
}

export default InheritancePractice