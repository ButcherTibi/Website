import React, {
	useState, useRef, useEffect, 
	CSSProperties,
	useCallback,
} from "react";

import './Slider.scss';


export interface SliderProps {
	value: number
	onValueChange: (value: number) => void

	min?: number
	max?: number
	step?: number

	// Number
	show_numeric_input?: boolean
	numeric_input_width?: number

	// Color
	hover_btn_color?: string
	pressed_btn_color?: string
};

// TODO: over render fix
export default function Slider(props: SliderProps)
{
	const onValueChange = props.onValueChange
	const min = props.min ?? 0
	const max = props.max ?? 1
	const step = props.step
	const show_numeric_input = props.show_numeric_input ?? false;
	const numeric_input_width = props.numeric_input_width ?? 50
	const hover_btn_color = props.hover_btn_color ?? 'hsla(0, 0%, 0%, 0.5)'
	const pressed_btn_color = props.pressed_btn_color ?? 'hsla(0, 0%, 0%, 0.75)'

	const max_highlight_size = 100;
	const highlight_size = 40;

	const [display_value, setDisplayValue] = useState(props.value.toFixed(2));	

	const track_elem = useRef<HTMLDivElement>(null)
	const is_thumb_pressed = useRef(false)


	const updateValueFromRatio = useCallback((ratio: number) => {
		let new_value = min + ((max - min) * ratio)

		if (step !== undefined &&	min < new_value && new_value < max) {
			new_value -= new_value % step;
		}

		onValueChange(new_value)
		setDisplayValue(new_value.toFixed(2))
	}, [step, max, min, onValueChange]);


	useEffect(() => {
		const moveThumb = (e: MouseEvent) => {
			if (is_thumb_pressed.current! === false) {
				return
			}
	
			let rect = track_elem.current!.getBoundingClientRect()
			let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left)
			new_ratio = new_ratio < 0 ? 0 : new_ratio
			new_ratio = new_ratio > 1 ? 1 : new_ratio
	
			updateValueFromRatio(new_ratio);
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


	// Update numeric input to incoming value
	useEffect(() => {
		// console.log(`Top down value = ${props.value}, display_value = ${display_value}`)

		if (props.value !== parseFloat(display_value)) {
			setDisplayValue(props.value.toFixed(2))
		}
	}, [props.value, display_value])


	const onThumbDown = (e: React.MouseEvent) => {
		e.preventDefault();
		const page_x = e.pageX

		is_thumb_pressed.current = true

		let rect = e.currentTarget!.getBoundingClientRect()
		let new_ratio = (page_x - rect.left) / (rect.right - rect.left)
		new_ratio = new_ratio < 0 ? 0 : new_ratio
		new_ratio = new_ratio > 1 ? 1 : new_ratio

		updateValueFromRatio(new_ratio)
	};

	const onThumbTouch = (e: React.TouchEvent) => {
		const page_x = e.targetTouches.item(0).pageX

		is_thumb_pressed.current = true

		let rect = e.currentTarget!.getBoundingClientRect()
		let new_ratio = (page_x - rect.left) / (rect.right - rect.left)
		new_ratio = new_ratio < 0 ? 0 : new_ratio
		new_ratio = new_ratio > 1 ? 1 : new_ratio

		updateValueFromRatio(new_ratio)
	}


	const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const new_value_str = e.target.value
		setDisplayValue(new_value_str)

		let new_value = parseFloat(new_value_str)

		if (isNaN(new_value) === false) {
			if (step !== undefined &&	min < new_value && new_value < max) {
				new_value -= new_value % step;
			}
	
			onValueChange(new_value)
		}
	}

	const onMouseMove = () => {
		if (is_thumb_pressed.current! === true) {
			return
		}

		const track_wrap = track_elem.current!
		const div = track_wrap.querySelector('.highlight div')! as HTMLDivElement
		div.style.backgroundColor = hover_btn_color
	}

	const onMouseLeave = () => {
		const track_wrap = track_elem.current!
		const div = track_wrap.querySelector('.highlight div')! as HTMLDivElement
		div.style.backgroundColor = ''
	}

	// Render
	// console.log(`render`)

	let clamped_value = props.value
	if (clamped_value < min) {
		clamped_value = min
	}
	else if (clamped_value > max) {
		clamped_value = max
	}

	const ratio: number = (clamped_value - min) / (max - min)

	const track_fill_style: CSSProperties = {
		width: `${ratio * 100}%`
	};

	const thumb_style: CSSProperties = {
		left: `calc(${ratio * 100}% - ${max_highlight_size / 2}px)`
	};
	
	let highlight_style: CSSProperties | undefined;
	if (is_thumb_pressed.current) {
		highlight_style = {
			backgroundColor: pressed_btn_color
		};
	}

	return <>
		<div className='Slider'>
			<div className='track-wrap' ref={track_elem}
				onMouseDown={onThumbDown}
				onTouchMove={onThumbTouch}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
			>
				<div className='track background-color'>
					<div className="fill fill-color" style={track_fill_style}></div>
				</div>
				<div className='thumb' style={thumb_style}>
					<div className="highlight">
						<div style={highlight_style}></div>
					</div>
					<div className="btn">
						<button className="thumb-color" />
					</div>
				</div>
			</div>
			{
				show_numeric_input &&
				<div className="numeric" style={{marginLeft: `${highlight_size / 2}px`}}>
					<input
						type={'number'}
						value={display_value}
						onChange={setInputValue}
						style={{width: `${numeric_input_width}px`}}
					/>			
				</div>
			}
		</div>
	</>;
};