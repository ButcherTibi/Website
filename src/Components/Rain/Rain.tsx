import React, { useEffect } from 'react'
import { jitter } from '../../Common'


interface RainLayerProps {
	class_name?: string
	drop_color?: string
}

function Rain(props: RainLayerProps)
{
	const class_name = props.class_name ?? 'rain-layer';
	const drop_color = props.drop_color ?? 'white';

	const drop_count = 100;

	const uniform_screen_size = 700;
	const drop_duration_min = 6000;
	const drop_duration_max = 8000;

	const drop_x_deviation_min = 2;
	const drop_x_deviation_max = 1;

	const drop_thickness_min = 3;
	const drop_thickness_max = 10;
	const drop_height_min = 100;
	const drop_height_max = 500;


	const animateDrop = (elem: HTMLElement, event?: AnimationPlaybackEvent) => {
		
		// remove previous animation, happens when developing
		if (elem.getAnimations().length > 0) {
			elem.getAnimations()[0].cancel();
		}

		let drop_size_ratio = jitter();

		let drop_width = drop_thickness_min + drop_thickness_max * drop_size_ratio;
		let drop_height = drop_width + drop_height_min +
			drop_height_max * drop_size_ratio;
		let drop_speed = drop_duration_min + drop_duration_max * (1 - drop_size_ratio);
		let x = jitter(0, 100);

		drop_height = Math.trunc(drop_height);

		requestAnimationFrame(() => {
			elem.style.display = 'initial';
			elem.style.top = `${-drop_height}px`;
			elem.style.left = `${x}%`;
			elem.style.width = `${drop_width}px`;
			elem.style.height = `${drop_height}px`;
			elem.style.backgroundColor = drop_color;
		});

		let drop_x_deviation = drop_x_deviation_min + drop_x_deviation_max * drop_size_ratio;
		let x_deviation = jitter(-drop_x_deviation, drop_x_deviation);

		let keyframes: Keyframe[] | PropertyIndexedKeyframes = [
			{
				transform: `translate(${x_deviation}vw, calc(100vh + ${drop_height}px))`
			}
		];

		// make the speed uniform regardless of screen size
		let screen_correction: number;

		// go faster if window is smaller
		if (window.innerHeight < uniform_screen_size) {
			screen_correction = window.innerHeight / uniform_screen_size;
		}
		// go slower if window is larger
		else {
			screen_correction = uniform_screen_size / window.innerHeight;
		}
		
		let options: KeyframeAnimationOptions = {
			delay: jitter(0, drop_duration_max),
			duration: drop_speed * screen_correction
		};

		let handle = elem.animate(keyframes, options);
		handle.addEventListener('finish', (e) => {
			animateDrop(elem, e);
		});
	};


	const animateRain = () => {
		let layer_elem = document.getElementsByClassName(class_name).item(0) as HTMLDivElement;

		for (let i = 0; i < layer_elem.children.length; i++) {
			let child_elem = layer_elem.children.item(i) as HTMLDivElement;
		
			/** cancel previous animation so that you don't add to the next
			 * causing it to move lower */
			let current_animations = child_elem.getAnimations();
			if (current_animations.length > 0) {
				current_animations[0].cancel()
			}

			animateDrop(child_elem);
		}
	};
	

	useEffect(() => {
		animateRain();
	}, []);
	
	
	// Render
	let drops: JSX.Element[] = [];
	for (let i = 0; i < drop_count; i++) {
		let new_drop = 
			<div key={i.toString()} className="drop" style={{display: 'none'}}>
			</div>
		;

		drops.push(new_drop);
	}

	return <div className={`rain-layer ${class_name}`}>
		{drops}
	</div>;
}

export default Rain;