import React, { useEffect } from "react";


function letterCount(str: string) {
	let counts = new Map<string, number>()

	str.split('').forEach((chara) => 
		counts.set(chara, (counts.get(chara) ?? 0) + 1)
	)

	let result = ''
	counts.forEach((count, chara) => 
		result += `${chara}${count} `
	)

	return result
}

function reset(arr: number[]) {
	const init_arr = [ 2, 1, 3, 0 ]
	arr.splice(0)
	Object.assign(arr, init_arr)
}


const MapSetPractice = () => {
	useEffect(() => {
		// Console Practice
		console.clear()
		console.groupCollapsed('Console Practice')
		{
			console.dir({foo: 1234, bar: 'string'})
			console.info('info message')
			console.debug('debug message')
			console.warn('warning message')
			console.error('error message')
			console.assert(false, 'assert message')
		}
		console.groupEnd()

		// Map Practice
		console.groupCollapsed('Map Practice')
		{
			const input = 'COFEBEEF'
			console.log(`${input} = ${letterCount(input)}`)
		}
		console.groupEnd()

		// Array Practice
		console.groupCollapsed('Array Practice')
		{
			let arr: number[] = []
			reset(arr)
			console.log(`starting array = ${arr}`)
	
			arr.sort((a, b) => a < b ? -1 : 1)
			console.log(`sort = ${arr}`)
	
			console.log(`last = ${arr.at(-1)}`)
			console.log(`findIndex = ${arr.findIndex(item => 0 < item && item < 3)}`)
	
			console.log(`every = ${arr.every(item => item > 0)}`)
			console.log(`some = ${arr.some(item => item > 0)}`)
	
			arr.splice(0, 0, -1)
			console.log(`insert at start = ${arr}`)
			reset(arr)
	
			 arr.splice(1, 1)
			console.log(`delete item = ${arr}`)
			reset(arr)
	
			arr.splice(1, 1, -999)
			console.log(`replace = ${arr}`)
			reset(arr)
	
			arr.splice(-2, 2)
			console.log(`delete last 2 = ${arr}`)
			reset(arr)

			console.log(`join = ${arr.join('')}`)
		}
		console.groupEnd()

		// String Practice
		console.groupCollapsed('String Practice')
		{
			let str = 'original string'
			console.log(str)
	
			console.log(`includes = ${str.includes('original')}`)
			console.log(`starts with = ${str.startsWith('origin')}`)
			console.log(`ends with = ${str.endsWith('ing')}`)
			console.log(`index of = ${str.indexOf('ing')}`)

			console.log(`replace = ${str.replace('origi', 'a')}`)
			console.log(`substring = ${str.substring(1, 7)}`)
		}
		console.groupEnd()
	}, [])

	return <p>MapSetPractice</p>
}

export default MapSetPractice