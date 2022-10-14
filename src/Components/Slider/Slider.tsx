import React, {
	useState, useRef, useEffect, 
	CSSProperties,
} from "react";

import './Slider.scss';


export interface SliderProps {
	value: number
	onValueChange: (value: number) => void

	default?: number
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

export default function Slider(props: SliderProps)
{
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
	const [is_thumb_pressed, setIsThumbPressed] = useState(false);

	const track_wrap_elem = useRef<HTMLDivElement>(null)


	const updateValue = (new_value: number) => {
		if (step !== undefined &&	min < new_value && new_value < max) {
			new_value -= new_value % step;
		}

		props.onValueChange(new_value)
		setDisplayValue(new_value.toFixed(2))
	}


	const setValueFromRatio = (ratio: number) => {
		updateValue(min + ((max - min) * ratio))
	};


	useEffect(() => {
		// console.log('use effect')

		const moveThumb = (e: MouseEvent) => {
			if (is_thumb_pressed === false) {
				return
			}
	
			let rect = track_wrap_elem.current!.getBoundingClientRect()
			let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left)
			new_ratio = new_ratio < 0 ? 0 : new_ratio
			new_ratio = new_ratio > 1 ? 1 : new_ratio
	
			setValueFromRatio(new_ratio);
		};
	
		const endThumbMovement = () => {
			setIsThumbPressed(false);
		};

		document.body.addEventListener('mousemove', moveThumb);
		document.body.addEventListener('mouseup', endThumbMovement);

		return () => {
			document.body.removeEventListener('mousemove', moveThumb);
			document.body.removeEventListener('mouseup', endThumbMovement);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_thumb_pressed]);


	// Update numeric input to incoming value
	useEffect(() => {
		if (parseFloat(display_value) !== props.value) {
			setDisplayValue(props.value.toFixed(2))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value])


	const setThumb = (e: React.MouseEvent) => {
		e.preventDefault();
		
		setIsThumbPressed(true);

		let rect = e.currentTarget!.getBoundingClientRect()
		let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left)
		new_ratio = new_ratio < 0 ? 0 : new_ratio
		new_ratio = new_ratio > 1 ? 1 : new_ratio

		setValueFromRatio(new_ratio)
	};

	const setThumbTouch = (e: React.TouchEvent) => {
		const page_x = e.targetTouches.item(0).pageX

		setIsThumbPressed(true);

		let rect = e.currentTarget!.getBoundingClientRect()
		let new_ratio = (page_x - rect.left) / (rect.right - rect.left)
		new_ratio = new_ratio < 0 ? 0 : new_ratio
		new_ratio = new_ratio > 1 ? 1 : new_ratio

		setValueFromRatio(new_ratio)
	}

	const endTouchDrag = () => {
		setIsThumbPressed(false)
	}


	const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const new_value_str = e.target.value
		setDisplayValue(new_value_str)

		let new_value = parseFloat(new_value_str)

		if (isNaN(new_value) === false) {
			if (step !== undefined &&	min < new_value && new_value < max) {
				new_value -= new_value % step;
			}
	
			props.onValueChange(new_value)
		}
	}

	const onEnter = () => {
		const track_wrap = track_wrap_elem.current!
		const div = track_wrap.querySelector('.highlight div')! as HTMLDivElement
		div.style.backgroundColor = hover_btn_color
	}

	const onLeave = () => {
		const track_wrap = track_wrap_elem.current!
		const div = track_wrap.querySelector('.highlight div')! as HTMLDivElement
		div.style.backgroundColor = ''
	}

	// Render
	// console.log('slider render')
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
	if (is_thumb_pressed) {
		highlight_style = {
			backgroundColor: pressed_btn_color
		};
	}

	return <>
		<div className='Slider'>
			<div className='track-wrap' ref={track_wrap_elem}
				onMouseDown={setThumb}
				onTouchMove={setThumbTouch}
				onTouchEnd={endTouchDrag}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
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