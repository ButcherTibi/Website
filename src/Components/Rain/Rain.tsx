import React, {
	useEffect, useState, useRef, useCallback
} from 'react'
import NumericInput from '../NumericInput/NumericInput'
import { jitter } from '../../Common'

import './Rain.scss'


class RainProps {
	class_name?: string
	z_index?: number
	drop_color?: string
	drop_count: number = 200
	drop_angle: number = 20

	drop_max_delay?: number
	drop_duration_min: number = 1000
	drop_duration_max: number = 5000

	drop_x_deviation_min: number = 0
	drop_x_deviation_max: number = 100

	drop_thickness_min: number = 3
	drop_thickness_max: number = 5
	drop_length_min: number = 20
	drop_length_max: number = 75
}

export function Rain(props: RainProps)
{
	const class_name = props.class_name ?? ''
	const z_index = props.z_index ?? 'initial'
	
	const drop_color = props.drop_color ?? 'hsla(209, 100%, 50%, 1)'

	// nu prea merge
	const uniform_size = 700
	
	const drop_max_delay = props.drop_max_delay ?? 1000

	const wrapper_ref = useRef<HTMLDivElement>(null)
	const wrapper_height = useRef(0)
	const hipo = useRef(0)


	const animateDrop = useCallback((elem: HTMLElement, is_first: boolean) => {
		requestAnimationFrame(() => {

			let animations = elem.getAnimations()
			for (let i = 0; i < animations.length; i++) {
				animations[i].cancel()
			}

			const diagonal = hipo.current!
			const half_diagonal = diagonal / 2

			const drop_size_ratio = jitter()
			const drop_thickness = props.drop_thickness_min + props.drop_thickness_max * drop_size_ratio
			const drop_length = drop_thickness + props.drop_length_min +
			props.drop_length_max * drop_size_ratio
				
			elem.style.borderBottomLeftRadius = `${drop_thickness}px`
			elem.style.borderBottomRightRadius = `${drop_thickness}px`
			elem.style.width = `${drop_thickness}px`  // nu se merită să fie înlocuit cu transform: scale
			elem.style.height = `${drop_length}px`
			elem.style.background = `linear-gradient(0deg, ${drop_color}, transparent)`
				
			const start_x = jitter(-half_diagonal, half_diagonal)
			const x_deviation_amount = jitter(props.drop_x_deviation_min, props.drop_x_deviation_max)
			const x_deviation = jitter(-x_deviation_amount, x_deviation_amount)

			let keyframes: Keyframe[] | PropertyIndexedKeyframes = [
				{
					transform: `
						translate(${start_x}px, ${-half_diagonal - drop_length}px)
					`
				},
				{
					opacity: 1,
					transform: `
						translate(${start_x + x_deviation}px, ${half_diagonal}px)
					`
				},
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

			// picăturile mai mari vor cădea mai repede
			const drop_speed = props.drop_duration_min + props.drop_duration_max * (1 - drop_size_ratio)
			
			let options: KeyframeAnimationOptions = {
				delay: is_first ? jitter(0, drop_max_delay) : 0,
				duration: drop_speed * size_correction
			}

			let handle = elem.animate(keyframes, options)
			handle.addEventListener('finish', (e) => {
				animateDrop(elem, false)
			})
		})
	}, [
		drop_color,
		props.drop_duration_max,
		props.drop_duration_min,
		props.drop_length_max,
		props.drop_length_min,
		drop_max_delay,
		props.drop_thickness_max,
		props.drop_thickness_min,
		props.drop_x_deviation_max,
		props.drop_x_deviation_min
	])


	const animateRain = useCallback(() => {
		let wrapper = wrapper_ref.current!
		let rain_layer = wrapper.children.item(0) as HTMLDivElement

		// resize rain layer for worse case scenario
		let rect = wrapper.getBoundingClientRect()
		wrapper_height.current = rect.height
		hipo.current = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2))

		rain_layer.style.transform = `rotate(${props.drop_angle}deg)`

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
	}, [animateDrop, props.drop_angle])
	

	useEffect(() => {
		animateRain()
		window.addEventListener('resize', animateRain)

		return () => {
			window.removeEventListener('resize', animateRain)
		}
	}, [animateRain])


	useEffect(() => {
		animateRain()
	}, [props.drop_count, animateRain])
	
	
	// Render
	let drops: JSX.Element[] = []
	for (let i = 0; i < props.drop_count; i++) {
		let new_drop = 
			<div key={i} className="drop">
			</div>
		;

		drops.push(new_drop)
	}

	return (
		<div className={`Rain ${class_name}`} ref={wrapper_ref}
			style={{zIndex: z_index}}>
			<div className={`spinner`}>
				{drops}
			</div>
		</div>
	)
}


export function RainDemo()
{
	const [editor_props, setEditorProps] = useState<RainProps>(new RainProps())
	const [active_props, setActiveProps] = useState<RainProps>(new RainProps())

	useEffect(() => {
		window.scrollTo(0, 0)
	})

	const applyEditorProps = () => {
		setActiveProps(editor_props)
	}

	return <>
		<div className='rain-container'>
			<Rain {...active_props} />
		</div>
		<main className='rain-demo content-wrap'>
			<div className='editor content'>
				<div className="description">
					<h3>Componenta <code>Rain</code></h3>
					<p>Crează o ploaie unde fiecare picătură este generată procedural.</p>
					<p>Aspectul se poate schimba folosind câmpurile de mai jos.</p>
				</div>

				<div className="general params" style={{gridArea: 'general'}}>	
					<NumericInput
						label="Numărul de picături"
						value={editor_props.drop_count}
						onValueChange={value => setEditorProps({ ...editor_props, drop_count: value})}
					/>
					<NumericInput
						label="Unghiul de cădere"
						value={editor_props.drop_angle}
						onValueChange={value => setEditorProps({ ...editor_props, drop_angle: value})}
					/>
				</div>

				<div className='pozitie params' style={{gridArea: 'pozitie'}}>
					<div className='interval'>
						<NumericInput
							label="Timpul minim de cădere"
							value={editor_props.drop_duration_min}
							onValueChange={value => setEditorProps({ ...editor_props, drop_duration_min: value})}
						/>
						<NumericInput
							label="Timpul maxim de cădere"
							value={editor_props.drop_duration_max}
							onValueChange={value => setEditorProps({ ...editor_props, drop_duration_max: value})}
						/>
					</div>
					<div className='interval'>
						<NumericInput
							label="Deviație minimă de cădere"
							value={editor_props.drop_x_deviation_min}
							onValueChange={value => setEditorProps({ ...editor_props, drop_x_deviation_min: value})}
						/>
						<NumericInput
							label="Deviație maxim de cădere"
							value={editor_props.drop_x_deviation_max}
							onValueChange={value => setEditorProps({ ...editor_props, drop_x_deviation_max: value})}
						/>
					</div>
				</div>

				<div className='shape params' style={{gridArea: 'shape'}}>
					<div className='interval'>
						<NumericInput
							label="Grosimea minimă a picături"
							value={editor_props.drop_thickness_min}
							onValueChange={value => setEditorProps({ ...editor_props, drop_thickness_min: value})}
						/>
						<NumericInput
							label="Grosimea maximă a picături"
							value={editor_props.drop_thickness_max}
							onValueChange={value => setEditorProps({ ...editor_props, drop_thickness_max: value})}
						/>		
					</div>

					<div className='interval'>
						<NumericInput
							label="Lungimea minimă a picături"
							value={editor_props.drop_length_min}
							onValueChange={value => setEditorProps({ ...editor_props, drop_length_min: value})}
						/>
						<NumericInput
							label="Lungimea maximă a picături"
							value={editor_props.drop_length_max}
							onValueChange={value => setEditorProps({ ...editor_props, drop_length_max: value})}
						/>
					</div>
				</div>

				<div className="btns-cell">
					<button onClick={applyEditorProps}>Aplică</button>
				</div>
			</div>
		</main>
	</>
}