import React, { CSSProperties, useEffect, useState } from "react";
import { factory, JsxAttribute, JsxElement } from "typescript";

import { jitter } from '../../Common'
import './FrontPage.scss'


interface RainLayerProps {
	class_name?: string
	drop_color?: string
}

function RainLayer(props: RainLayerProps)
{
	const class_name = props.class_name ?? 'rain-layer';
	const drop_color = props.drop_color ?? 'red';

	const drop_count = 100;

	const drop_delay_min = 0;
	const drop_delay_max = 4000;
	const uniform_screen_size = 700;
	const drop_duration_min = 2000;
	const drop_duration_max = 4000;

	const drop_x_deviation_min = 2;
	const drop_x_deviation_max = 1;

	const drop_thickness_min = 3;
	const drop_thickness_max = 2;
	const drop_height_min = 10;
	const drop_height_max = 50;


	const animateRay = (elem: HTMLElement, event?: AnimationPlaybackEvent) => {
		
		let drop_size_ratio = jitter();

		let drop_width = drop_thickness_min + drop_thickness_max * drop_size_ratio;
		let drop_height = drop_width + drop_height_min +
			drop_height_max * drop_size_ratio;
		let drop_speed = drop_duration_min + drop_duration_max * (1 - drop_size_ratio);

		requestAnimationFrame(() => {
			elem.style.display = 'initial';
			elem.style.top = `${-drop_height}px`;
			elem.style.left = `${jitter(0, 100)}%`;
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
			delay: jitter(drop_delay_min, drop_delay_max),
			duration: drop_speed * screen_correction
		};

		let handle = elem.animate(keyframes, options);
		handle.addEventListener('finish', (e) => {
			animateRay(elem, e);
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

			animateRay(child_elem);
		}
	};
	

	useEffect(() => {
		animateRain();
	}, []);
	
	
	// Render
	let rays: JSX.Element[] = [];
	for (let i = 0; i < drop_count; i++) {
		let new_ray = 
			<div key={i.toString()} className="ray" style={{display: 'none'}}>
			</div>
		;

		rays.push(new_ray);
	}

	return <div className={`rain-layer ${class_name}`}>
		{rays}
	</div>;
}


function FrontPage()
{
	return <>
		<div className="front-page">
			<header className="content-wrap">
				<div className="content">
					<h1>ButcherTibi</h1>
				</div>
			</header>

			<main className="content-wrap">
				<div className="content">
				</div>
			</main>

			<footer className="content-wrap">
				<div className="content">
				</div>
			</footer>

			<RainLayer
				class_name="rain-layer-1"
				drop_color="blue"
			/>
			{/* <RainLayer class_name="rain-layer-2" />
			<RainLayer class_name="rain-layer-3" /> */}
		</div>
	</>;
}

export default FrontPage;