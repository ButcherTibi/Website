import React, {
	CSSProperties, useState, useEffect
} from "react";

import './Slider.scss';


export interface SliderProps {
	default?: number;
	min?: number;
	max?: number;
	step?: number;
	show_numeric_input?: boolean;
	numeric_input_width?: number;
};

export default function Slider(props: SliderProps)
{
	let default_value = props.default === undefined ? 0.5 : props.default;
	let min = props.min === undefined ? 0 : props.min;
	let max = props.max === undefined ? 1 : props.max;
	let step = props.step;
	let show_numeric_input = props.show_numeric_input === undefined ? false : true;
	let numeric_input_width = props.numeric_input_width === undefined ? 40 : props.numeric_input_width;

	const [value, setValue] = useState(default_value);
	const [display_val, setDisplayValue] = useState(default_value.toFixed(2));

	const max_highlight_size = 100;
	const highlight_size = 40;
	const [is_hovered, setIsThumbHovered] = useState(false);
	const [is_thumb_pressed, setIsThumbPressed] = useState(false);
	const [track_wrap_elem, setTrackWrapElem] = useState<HTMLElement | null>(null);


	const thumbEnter = () => {
		setIsThumbHovered(true);
	};


	const thumbLeave = () => {
		setIsThumbHovered(false);
	};


	const beginThumb = (e: React.MouseEvent) => {
		e.preventDefault();  // nu încerca să copiezi elementul cu drag and drop
		setIsThumbPressed(true);

		let button = e.currentTarget;
		let btn = button.parentElement!;
		let thumb = btn.parentElement!;
		let track_wrap = thumb.parentElement!;
		setTrackWrapElem(track_wrap);
	};


	const setValueFromRatio = (ratio: number) => {
		let new_value = ((max - min) * ratio) + min;

		if (step !== undefined && new_value !== max && new_value !== min) {
			new_value -= new_value % step;
		}

		setValue(new_value);
		setDisplayValue(new_value.toFixed(2));
	};


	const moveThumb = (e: MouseEvent) => {
		if (is_thumb_pressed === false || track_wrap_elem === null) {
			return;
		}

		let rect = track_wrap_elem.getBoundingClientRect();
		let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left);
		new_ratio = new_ratio < 0 ? 0 : new_ratio;
		new_ratio = new_ratio > 1 ? 1 : new_ratio;

		setValueFromRatio(new_ratio);
	};


	const endThumbMovement = () => {
		setIsThumbPressed(false);
	};


	useEffect(() => {
		document.body.addEventListener('mousemove', moveThumb);
		document.body.addEventListener('mouseup', endThumbMovement);

		return () => {
			document.body.removeEventListener('mousemove', moveThumb);
			document.body.removeEventListener('mouseup', endThumbMovement);
		};
	});


	const setThumb = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsThumbPressed(true);

		setTrackWrapElem(e.currentTarget as HTMLElement);

		let rect = e.currentTarget!.getBoundingClientRect();
		let new_ratio = (e.pageX - rect.left) / (rect.right - rect.left);
		new_ratio = new_ratio < 0 ? 0 : new_ratio;
		new_ratio = new_ratio > 1 ? 1 : new_ratio;

		setValueFromRatio(new_ratio);
	};


	const setInputValue = (e: any) => {	
		let new_value = parseFloat(e.target.value);

		if (isNaN(new_value) === false) {
			if (min <= new_value && new_value <= max) {
				
				if (step !== undefined && new_value !== max && new_value !== min) {
					new_value -= new_value % step;
				}

				setValue(new_value);
				setDisplayValue(e.target.value);
			}
		}
		else {
			setDisplayValue('');
		}
	};


	let ratio: number = (value - min) / (max - min);

	let track_fill_style: CSSProperties = {
		width: `${ratio * 100}%`
	};

	let thumb_style: CSSProperties = {
		left: `calc(${ratio * 100}% - ${max_highlight_size / 2}px)`
	};
	
	let highlight_style: CSSProperties | undefined;

	if (is_thumb_pressed) {

		let color = `hsla(
			var(--theme_backgrd_hue),
			var(--theme_backgrd_sat),
			var(--theme_backgrd_lum),
			0.75
		)`;

		highlight_style = {
			width: `${highlight_size}px`,
			height: `${highlight_size}px`,
			backgroundColor: color
		};
	}
	else if (is_hovered) {

		let color = `hsla(
			var(--theme_backgrd_hue),
			var(--theme_backgrd_sat),
			var(--theme_backgrd_lum),
			0.5
		)`;

		highlight_style = {
			width: `${highlight_size}px`,
			height: `${highlight_size}px`,
			backgroundColor: color
		};
	}

	return <>
		<div className='slider'>
			<div className='track-wrap'
				onMouseDown={setThumb}
				onMouseEnter={thumbEnter}
				onMouseLeave={thumbLeave}
			>
				<div className='track'>
					<div className="fill" style={track_fill_style}></div>
				</div>
				<div className='thumb' style={thumb_style}>
					<div className="highlight">
						<div style={highlight_style}></div>
					</div>
					<div className="btn">
						<button onMouseDown={beginThumb} />
					</div>
				</div>
			</div>
			{
				show_numeric_input &&
				<div className="numeric" style={{marginLeft: `${highlight_size / 2}px`}}>
					<input
						type={'number'}
						value={display_val}
						onInput={setInputValue}
						style={{width: `${numeric_input_width}px`}}
					/>
				</div>
			}
		</div>
	</>;
};