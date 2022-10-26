import React, { useEffect } from 'react'


function Base() {

}

function Vector3D(this: any) {
	this.x = 0
	this.y = 0
	this.z = 0
}


const PrototypePractice = () => {
	useEffect(() => {
		console.clear()

		Base.prototype.add = function() {
			console.debug('base add')
		}

		Vector3D.prototype = Base.prototype

		let vec = new (Vector3D as any)()
		vec.add()

		Base.prototype.add = function () {
			console.debug('altered add')
		}
		vec.add()

		Vector3D.prototype.add = function() {
			console.debug('derived add')
		}
		vec.add()
	}, [])

	return <p>PrototypePractice</p>
}

export default PrototypePractice