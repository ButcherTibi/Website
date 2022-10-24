import React, { useRef, useState, useEffect, CSSProperties, useCallback } from 'react'

import { clamp } from '../../Common'

import './RangeSlider.scss'


interface Props {
	left_value: number
	right_value: number
	onLeftValueChange: (new_value: number) => void
	onRightValueChange: (new_value: number) => void

	min?: number
	max?: number
	step?: number

	className?: string
	height?: number
	thickness?: number
	hover_thickness?: number
	hover_btn_color?: string
	pressed_btn_color?: string
	thumb_size?: number

	display_input?: boolean
	input_width?: number
	gap?: number
} 

const RangeSlider = (props: Props) => {
	const [
		left_value, right_value,
		onLeftValueChange, onRightValueChange
	] = [
		props.left_value, props.right_value,
		props.onLeftValueChange, props.onRightValueChange
	]
	const min = props.min ?? 0
	const max = props.max ?? 1
	const height = props.height ?? 30
	const thickness = props.thickness ?? 5
	const hover_thickness = props.hover_thickness ?? 40
	const hover_color = props.hover_btn_color ?? 'hsla(0, 0%, 0%, 0.5)'
	const pressed_btn_color = props.pressed_btn_color ?? 'hsla(0, 0%, 0%, 0.75)'
	const thumb_size = props.thumb_size ?? 20
	const display_input = props.display_input ?? false
	const input_width = props.input_width ?? 60
	const gap = props.gap ?? 15

	const [left_display, setLeftDisplay] = useState('')
	const [right_display, setRightDisplay] = useState('')
	
	const is_thumb_pressed = useRef(false);
	const track_elem = useRef<HTMLDivElement>(null)


	const updateValueFromRatio = useCallback((ratio: number) => {
		const new_value = min + ((max - min) * ratio)
		const center = left_value + (right_value - left_value) / 2

		if (new_value < center) {
			onLeftValueChange(new_value)
		}
		else {
			onRightValueChange(new_value)
		}
	}, [max, min, left_value, right_value, onLeftValueChange, onRightValueChange])


	useEffect(() => {
		// console.log('effect')

		const moveThumb = (e: MouseEvent) => {
			if (is_thumb_pressed.current === false) {
				return
			}
	
			let rect = track_elem.current!.getBoundingClientRect()
			let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left)
			new_ratio = new_ratio < 0 ? 0 : new_ratio
			new_ratio = new_ratio > 1 ? 1 : new_ratio
			
			updateValueFromRatio(new_ratio)
		};
	
		const endThumbMovement = () => {
			is_thumb_pressed.current = false
		};

		document.body.addEventListener('mousemove', moveThumb);
		document.body.addEventListener('mouseup', endThumbMovement);

		return () => {
			document.body.removeEventListener('mousemove', moveThumb);
			document.body.removeEventListener('mouseup', endThumbMovement);
		};
	}, [updateValueFromRatio]);


	useEffect(() => {
		// console.log('effect left')

		if (props.left_value !== parseFloat(left_display)) {
			setLeftDisplay(props.left_value.toFixed(2))
		}
	}, [props.left_value, left_display])


	useEffect(() => {
		// console.log('effect right')

		if (props.right_value !== parseFloat(right_display)) {
			setRightDisplay(props.right_value.toFixed(2))
		}
	}, [props.right_value, right_display])


	const assignThumbColor = (ratio: number, color: string) => {
		const new_value = min + ((max - min) * ratio)
		const center = left_value + (right_value - left_value) / 2

		let active_selector = ''
		let inactive_selector = ''

		if (new_value < center) {
			active_selector = '.left-thumb .hover'
			inactive_selector = '.right-thumb .hover'
		}
		else {
			active_selector = '.right-thumb .hover'
			inactive_selector = '.left-thumb .hover'
		}

		const track_wrap = track_elem.current!
		let elem = track_wrap.querySelector(active_selector)! as HTMLDivElement
		elem.style.backgroundColor = color

		elem = track_wrap.querySelector(inactive_selector)! as HTMLDivElement
		elem.style.backgroundColor = 'transparent'
	}


	const setThumb = (e: React.MouseEvent) => {
		e.preventDefault()
		is_thumb_pressed.current = true

		let rect = e.currentTarget!.getBoundingClientRect()
		let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left)
		new_ratio = new_ratio < 0 ? 0 : new_ratio
		new_ratio = new_ratio > 1 ? 1 : new_ratio

		assignThumbColor(new_ratio, pressed_btn_color)
		updateValueFromRatio(new_ratio)
	}

	const setThumbTouch = (e: React.TouchEvent) => {
		is_thumb_pressed.current = true
		const page_x = e.targetTouches.item(0).pageX

		let rect = e.currentTarget!.getBoundingClientRect()
		let new_ratio = (page_x - rect.left) / (rect.right - rect.left)
		new_ratio = new_ratio < 0 ? 0 : new_ratio
		new_ratio = new_ratio > 1 ? 1 : new_ratio

		assignThumbColor(new_ratio, pressed_btn_color)
		updateValueFromRatio(new_ratio)
	}


	const setLeftValueFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const new_value_str = e.target.value
		setLeftDisplay(new_value_str)

		let new_value = parseFloat(new_value_str)

		if (isNaN(new_value) === false) {
			if (props.step !== undefined &&	min < new_value && new_value < max) {
				new_value -= new_value % props.step;
			}
	
			props.onLeftValueChange(new_value)
		}
	}


	const setRightValueFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const new_value_str = e.target.value
		setRightDisplay(new_value_str)

		let new_value = parseFloat(new_value_str)

		if (isNaN(new_value) === false) {
			if (props.step !== undefined &&	min < new_value && new_value < max) {
				new_value -= new_value % props.step;
			}
	
			props.onRightValueChange(new_value)
		}
	}


	const onMouseMove = (e: React.MouseEvent) => {
		if (is_thumb_pressed.current! === true) {
			return
		}

		const track_wrap = track_elem.current!

		let rect = track_wrap.getBoundingClientRect()
		let ratio = (e.pageX - rect.left) / (rect.right - rect.left)
		ratio = ratio < 0 ? 0 : ratio
		ratio = ratio > 1 ? 1 : ratio

		assignThumbColor(ratio, hover_color)
	}

	const onMouseLeave = () => {
		const track_wrap = track_elem.current!
		const left_div = track_wrap.querySelector('.left-thumb .hover')! as HTMLDivElement
		left_div.style.backgroundColor = 'transparent'
		
		const right_div = track_wrap.querySelector('.right-thumb .hover')! as HTMLDivElement
		right_div.style.backgroundColor = 'transparent'
	}

	
	// Render
	// console.log('render')

	const clamped_left = clamp(props.left_value, min, max)
	const clamped_right = clamp(props.right_value, min, max)

	const magnitude = max - min
	const left_ratio = (clamped_left - min) / magnitude
	const right_ratio = (clamped_right - min) / magnitude

	const track_style: CSSProperties = {
		height: height,
	}

	const track_empty_style: CSSProperties = {
		top: (height - thickness) / 2,
		height: thickness
	}
 
	const track_fill_style: CSSProperties = {
		left: `${left_ratio * 100}%`,
		width: `${(right_ratio - left_ratio) * 100}%`
	}

	const left_thumb_style: CSSProperties = {
		left: `${left_ratio * 100}%`,
		top: height / 2
	}

	const right_thumb_style: CSSProperties = {
		left: `${right_ratio * 100}%`,
		top: height / 2
	}

	const hover_style: CSSProperties = {
		left: -hover_thickness / 2,
		top: -hover_thickness / 2,
		width: hover_thickness,
		height: hover_thickness
	}

	const btn_style: CSSProperties = {
		left: -thumb_size / 2,
		top: -thumb_size / 2,
		width: thumb_size,
		height: thumb_size
	}

	let left_input: React.ReactElement | null = null
	let right_input: React.ReactElement | null = null
	if (display_input) {
		left_input = <input className='numeric' type={'number'} 
			value={left_display} step={props.step} onChange={setLeftValueFromInput}
			style={{width: input_width}}
		/>
		right_input = <input className='numeric' type={'number'}
			value={right_display} step={props.step} onChange={setRightValueFromInput}
			style={{width: input_width}}
		/>
	}

	return <div className={`RangeSlider ${props.className ?? ''}`}
		style={{gap: gap}}>
		{left_input}
		<div className='track' ref={track_elem} style={track_style}
			onMouseDown={setThumb}
			onTouchMove={setThumbTouch}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			<div className='track-empty background-color' style={track_empty_style}>
				<div className='track-fill fill-color' style={track_fill_style} />
				{/* <div className='hover-fill hover-fill-color' style={hover_fill_style} /> */}
			</div>

			<div className='left-thumb thumb' style={left_thumb_style}>
				<div>
					<div className='hover' style={hover_style} />
					<button className='thumb-color' style={btn_style} />
				</div>
			</div>
			<div className='right-thumb thumb' style={right_thumb_style}>
				<div>
					<div className='hover' style={hover_style} />
					<button className='thumb-color' style={btn_style} />
				</div>
			</div>
		</div>
		{right_input}
	</div>
}

export default RangeSlider