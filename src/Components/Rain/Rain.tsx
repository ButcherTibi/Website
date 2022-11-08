import React, {
	useEffect, useReducer, useRef, useCallback
} from 'react'
import Slider from '../Slider/Slider'
import RangeSlider from '../RangeSlider/RangeSlider'
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


enum ActionType {
	swap,
	initial_preset,
	lines_preset,
	bars_preset,
	ash_preset,
	update_editor_param
}

class State {
	editor_props: RainProps = new RainProps()
	active_props: RainProps = new RainProps()
}

class DispatchParams {
	type: ActionType = ActionType.swap
	field_name?: string
	new_value?: any
}

function reducer(state: State, action: DispatchParams) {
	let new_state = { ...state }
	
	switch (action.type) {
		case ActionType.swap: {
			new_state.active_props = { ...state.editor_props }
			break;
		}
		case ActionType.initial_preset: {
			const initial = new RainProps()
			new_state.editor_props = { ...initial }
			new_state.active_props = { ...initial }
			break
		}
		case ActionType.lines_preset: {
			let preset = new RainProps()
			preset.drop_color = 'hsl(166, 100%, 43%)'
			preset.drop_angle = 181
			preset.drop_duration_min = 5000
			preset.drop_duration_max = 7500
			preset.drop_x_deviation_min = 100
			preset.drop_x_deviation_max = 200
			preset.drop_length_min = 500
			preset.drop_length_max = 1000

			new_state.editor_props = { ...preset }
			new_state.active_props = { ...preset }
			break
		}
		case ActionType.bars_preset: {
			let preset = new RainProps()
			preset.drop_color = 'hsl(256, 100%, 47%)'
			preset.drop_angle = -60
			preset.drop_duration_min = 7500
			preset.drop_duration_max = 10000
			preset.drop_thickness_min = 30
			preset.drop_thickness_max = 50
			preset.drop_x_deviation_min = 100
			preset.drop_x_deviation_max = 500
			preset.drop_length_min = 1000
			preset.drop_length_max = 1000 

			new_state.editor_props = { ...preset }
			new_state.active_props = { ...preset }
			break
		}
		case ActionType.ash_preset: {
			let preset = new RainProps()
			preset.drop_color = 'hsl(5, 100%, 55%)'
			preset.drop_angle = 120
			preset.drop_duration_min = 7500
			preset.drop_duration_max = 10000
			preset.drop_thickness_min = 200
			preset.drop_thickness_max = 200
			preset.drop_x_deviation_min = 100
			preset.drop_x_deviation_max = 1000
			preset.drop_length_min = 0
			preset.drop_length_max = 0 

			new_state.editor_props = { ...preset }
			new_state.active_props = { ...preset }
			break
		}
		case ActionType.update_editor_param: {
			if (action.field_name === undefined) {
				throw new Error('field_name e undefined')
			}
			(new_state.editor_props as any)[action.field_name] = action.new_value
			break;
		}
		default: console.trace()
	}

	return new_state
}


export function RainDemo()
{
	const [state, dispatch] = useReducer(reducer, new State())

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const applyEditorProps = () => {
		dispatch(new DispatchParams())
	}

	const updateEditorParam = (field_name: string, new_value: number) => {
		dispatch({
			type: ActionType.update_editor_param,
			field_name: field_name,
			new_value: new_value
		})
	}

	const slider_props = {
		hover_btn_color: 'hsla(209deg, 75%, 47%, 0.25)',
		pressed_btn_color: 'hsla(209deg, 75%, 47%, 0.5)'
	}

	const is_ro = navigator.language === 'ro'

	let description: JSX.Element
	if (is_ro) {
		description = <>
			<h3>Componenta <code>Rain</code></h3>
			<p>Crează o ploaie unde fiecare picătură este generată procedural.</p>
			<p>Aspectul se poate schimba folosind câmpurile de mai jos.</p>
		</>
	}
	else {
		description = <>
			<h3><code>Rain</code> component</h3>
			<p>Creates a rain were each drop is generated procedurally.</p>
			<p>The appearance can be changed using the fields below.</p>
		</>
	}

	// Render
	//console.log('render')
	return <>
		<div className='rain-container'>
			<Rain {...state.active_props} />
		</div>
		<main className='rain-demo content-wrap'>
			<div className='editor content'>
				<div className="description">
					{description}
				</div>

				<div className="presets" style={{gridArea: 'presets'}}>
					<h3>{is_ro ? 'Presetări' : 'Presets'}</h3>
					<div className="presets-list">
						<button onClick={() => dispatch({type: ActionType.initial_preset})}>
							{is_ro ? 'Inițial' : 'Initial'}
						</button>
						<button onClick={() => dispatch({type: ActionType.lines_preset})}>
							{is_ro ? 'Linii' : 'Lines'}
						</button>
						<button onClick={() => dispatch({type: ActionType.bars_preset})}>					
							{is_ro ? 'Bare' : 'Bars'}
						</button>
						<button onClick={() => dispatch({type: ActionType.ash_preset})}>
							{is_ro ? 'Bule' : 'Bubbles'}
						</button>
					</div>
				</div>

				<div className="general params" style={{gridArea: 'general'}}>						
					<div>
						<label>{is_ro ? 'Numărul de picături' : 'Droplet count'}</label>
						<Slider
							{...slider_props}
							value={state.editor_props.drop_count}
							onValueChange={value => updateEditorParam('drop_count', value)}
							min={1}
							max={200}
							show_numeric_input={true}
						/>
					</div>

					<div>
						<label>{is_ro ? 'Unghiul de cădere' : 'Fall angle'}</label>
						<Slider
							{...slider_props}
							value={state.editor_props.drop_angle}
							onValueChange={value => updateEditorParam('drop_angle', value)}
							min={-360}
							max={+360}
							show_numeric_input={true}
						/>
					</div>
				</div>

				<div className='pozitie params' style={{gridArea: 'pozitie'}}>
					<div>
						<label>{is_ro ? 'Timpul de cădere (milisecunde)' : 'Fall duration (miliseconds)'}</label>
						<RangeSlider
							{...slider_props}
							left_value={state.editor_props.drop_duration_min}
							right_value={state.editor_props.drop_duration_max}
							onLeftValueChange={value => updateEditorParam('drop_duration_min', value)}
							onRightValueChange={value => updateEditorParam('drop_duration_max', value)}

							min={0}
							max={10_000}
							display_input={true}
						/>
					</div>

					<div>
						<label>{is_ro ? 'Deviație de cădere' : 'Fall deviation'}</label>
						<RangeSlider
							{...slider_props}
							left_value={state.editor_props.drop_x_deviation_min}
							right_value={state.editor_props.drop_x_deviation_max}
							onLeftValueChange={value => updateEditorParam('drop_x_deviation_min', value)}
							onRightValueChange={value => updateEditorParam('drop_x_deviation_max', value)}

							min={0}
							max={1000}
							display_input={true}
						/>
					</div>
				</div>

				<div className='shape params' style={{gridArea: 'shape'}}>
					<div>
						<label>{is_ro ? 'Grosimea unei picături' : 'Droplet thickness'}</label>
						<RangeSlider
							{...slider_props}
							left_value={state.editor_props.drop_thickness_min}
							right_value={state.editor_props.drop_thickness_max}
							onLeftValueChange={value => updateEditorParam('drop_thickness_min', value)}
							onRightValueChange={value => updateEditorParam('drop_thickness_max', value)}

							min={0}
							max={300}
							display_input={true}
						/>
					</div>

					<div>
						<label>{is_ro ? 'Lungimea unei picături' : 'Droplet length'}</label>
						<RangeSlider
							{...slider_props}
							left_value={state.editor_props.drop_length_min}
							right_value={state.editor_props.drop_length_max}
							onLeftValueChange={value => updateEditorParam('drop_length_min', value)}
							onRightValueChange={value => updateEditorParam('drop_length_max', value)}

							min={0}
							max={1000}
							display_input={true}
						/>
					</div>
				</div>

				<div className="btns-cell">
					<button onClick={applyEditorProps}>
						{is_ro ? 'Aplică' : 'Apply'}
					</button>
				</div>
			</div>
		</main>
	</>
}