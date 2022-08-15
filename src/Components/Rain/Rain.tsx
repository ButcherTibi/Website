import React, { CSSProperties, LegacyRef, useEffect, useRef } from 'react'
import { jitter } from '../../Common'

import './Rain.scss'


interface RainLayerProps {
	class_name?: string
	z_index?: number
	drop_color?: string
	drop_count?: number
	layer_angle?: number

	drop_max_delay?: number
	drop_duration_min?: number
	drop_duration_max?: number

	drop_x_deviation_min?: number
	drop_x_deviation_max?: number

	drop_thickness_min?: number
	drop_thickness_max?: number
	drop_height_min?: number
	drop_height_max?: number
}

function Rain(props: RainLayerProps)
{
	const class_name = props.class_name ?? ''
	const z_index = props.z_index ?? 'initial'
	const drop_color = props.drop_color ?? 'blue'
	const drop_count = props.drop_count ?? 100
	const layer_angle = props.layer_angle ?? 0

	const uniform_size = 700
	
	const drop_max_delay = props.drop_max_delay ?? 1000
	const drop_duration_min = props.drop_duration_min ?? 1000
	const drop_duration_max = props.drop_duration_max ?? 1000

	const drop_x_deviation_min = props.drop_x_deviation_min ?? 0
	const drop_x_deviation_max = props.drop_x_deviation_max ?? 0

	const drop_thickness_min = props.drop_thickness_min ?? 3
	const drop_thickness_max = props.drop_thickness_max ?? 10
	const drop_height_min = props.drop_height_min ?? 10
	const drop_height_max = props.drop_height_max ?? 50


	const wrapper_ref = useRef<HTMLDivElement>(null)
	const wrapper_height = useRef(0)
	const hipo = useRef(0)


	const animateDrop = (elem: HTMLElement, is_first: boolean) => {
		requestAnimationFrame(() => {

			// remove previous animation, happens when developing
			if (elem.getAnimations().length > 0) {
				elem.getAnimations()[0].cancel()
			}

			let drop_size_ratio = jitter()

			let drop_width = drop_thickness_min + drop_thickness_max * drop_size_ratio
			let drop_height = drop_width + drop_height_min +
				drop_height_max * drop_size_ratio
			let drop_speed = drop_duration_min + drop_duration_max * (1 - drop_size_ratio)
			let x = jitter(0, 100)

			drop_height = Math.trunc(drop_height)

			elem.style.display = 'initial'
			elem.style.top = `${-drop_height}px`
			elem.style.left = `${x}%`
			elem.style.borderTopLeftRadius = `100%`
			elem.style.borderTopRightRadius = `100%`
			elem.style.borderBottomLeftRadius = `${drop_width}px`
			elem.style.borderBottomRightRadius = `${drop_width}px`
			elem.style.width = `${drop_width}px`
			elem.style.height = `${drop_height}px`
			elem.style.background = `linear-gradient(0deg, ${drop_color}, transparent)`
			
			let drop_x_deviation = drop_x_deviation_min + drop_x_deviation_max * drop_size_ratio
			let x_deviation = jitter(-drop_x_deviation, drop_x_deviation)

			let keyframes: Keyframe[] | PropertyIndexedKeyframes = [
				{
					transform: `translate(${x_deviation}vw, calc(${hipo.current}px + ${drop_height}px))`
				}
			]

			// make the speed uniform regardless of size
			let size_correction: number

			// go faster if smaller
			if (wrapper_height.current < uniform_size) {
				size_correction = wrapper_height.current / uniform_size
			}
			// go slower if larger
			else {
				size_correction = uniform_size / wrapper_height.current
			}
			
			let options: KeyframeAnimationOptions = {
				delay: is_first ? jitter(0, drop_max_delay) : 0,
				duration: drop_speed * size_correction
			}

			let handle = elem.animate(keyframes, options)
			handle.addEventListener('finish', (e) => {
				animateDrop(elem, false)
			})
		})
	}


	const animateRain = () => {
		let wrapper = wrapper_ref.current!

		let rain_layer = wrapper.getElementsByClassName('rain-layer')
			.item(0) as HTMLDivElement
		;

		// resize rain layer for worse case scenario
		let rect = wrapper.getBoundingClientRect()
		wrapper_height.current = rect.height
		hipo.current = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2))

		rain_layer.style.top = `-${(hipo.current - rect.height) / 2}px`
		rain_layer.style.left = `-${(hipo.current - rect.width) / 2}px`
		rain_layer.style.width = `${hipo.current}px`
		rain_layer.style.height = `${hipo.current}px`
		rain_layer.style.transformOrigin = 'center'
		rain_layer.style.transform = `rotate(${layer_angle}deg)`

		for (let i = 0; i < rain_layer.children.length; i++) {
			let child_elem = rain_layer.children.item(i) as HTMLDivElement
		
			/** cancel previous animation so that you don't add to the next
			 * causing it to move lower */
			let current_animations = child_elem.getAnimations()
			if (current_animations.length > 0) {
				current_animations[0].cancel()
			}

			animateDrop(child_elem, true)
		}
	}
	

	useEffect(() => {
		animateRain()
		window.addEventListener('resize', animateRain)

		return () => {
			window.removeEventListener('resize', animateRain)
		}
	}, [])
	
	
	// Render
	let drops: JSX.Element[] = []
	for (let i = 0; i < drop_count; i++) {
		let new_drop = 
			<div key={i.toString()} className="drop" style={{display: 'none'}}>
			</div>
		;

		drops.push(new_drop)
	}

	return (
		<div className={`rain-layer-wrap ${class_name}`} ref={wrapper_ref}
			style={{zIndex: z_index}}>
			<div className={`rain-layer`}>
				{drops}
			</div>
		</div>
	)
}

export default Rain