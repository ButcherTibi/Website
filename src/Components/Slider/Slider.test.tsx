/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from 'react'
import { render } from "@testing-library/react"
import Slider from './Slider'

describe('Slider component tests', () => {
	test("Don't call onValueChange on prop value change", () => {
		const value_initial = 123
		const value_after = 456
		let value_out = 9999
	
		const { rerender } = render(<Slider
			value={value_initial}
			onValueChange={value => { value_out = value }}
		/>)

		expect(value_initial !== value_out).toBeTruthy()

		rerender(<Slider
			value={value_after}
			onValueChange={value => { value_out = value }}
		/>)

		expect(value_after !== value_out).toBeTruthy()
	})


	test("Update display value on prop change", () => {
		const value_initial = 123
		const value_after = 456

		const { rerender, container } = render(<Slider
			value={value_initial}
			onValueChange={value => {}}
			show_numeric_input={true}
		/>)

		{
			const inputs = container.getElementsByTagName('input')
			expect(inputs.length > 0).toBeTruthy()
			const first = inputs.item(0) as HTMLInputElement
			expect(first.value === value_initial.toFixed(2)).toBeTruthy()
		}
		

		rerender(<Slider
			value={value_after}
			onValueChange={value => {}}
			show_numeric_input={true}
		/>)

		{
			const inputs = container.getElementsByTagName('input')
			expect(inputs.length > 0).toBeTruthy()
			const first = inputs.item(0) as HTMLInputElement
			expect(first.value === value_after.toFixed(2)).toBeTruthy()
		}
	})
})

