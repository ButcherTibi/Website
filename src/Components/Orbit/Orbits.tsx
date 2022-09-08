import React, { CSSProperties, useEffect, useRef, useState } from "react";

import './Orbits.scss'


class Vec2D {
	x: number = 0
	y: number = 0
}

interface OrbitProps {
	title: string
	icon: string
	labels: string[]

	scale: number
	offset: Vec2D

	solar_system_center: Vec2D
	solar_system_size: number
	solar_system_revolution_duration: number

	main_orbit_diameter: number

	selected_planet: number
	planet_index: number
	planet_count: number
	planet_size: number
	
	zoomToPlanet: (selected_planet: number, planet_pos: Vec2D) => void
}

export function Orbit(props: OrbitProps)
{
	const label_padding = 10;

	const planet_pos = useRef(new Vec2D())

	const orbit_elem = useRef<HTMLDivElement>(null)
	const planet_elem = useRef<HTMLImageElement>(null)


	const is_any_planet_selected = props.selected_planet !== -1
	const is_this_planet_selected = props.selected_planet === props.planet_index


	useEffect(() => {
		// Start orbit counter rotation 
		let planet = planet_elem.current!
		if (planet.getAnimations().length === 0) {
			planet.animate([
				{
					transform: 'rotate(0deg)'
				},
				{
					transform: 'rotate(-360deg)'
				}
			], {
				duration: props.solar_system_revolution_duration,
				iterations: Infinity
			})
		}
	}, [props.solar_system_revolution_duration])


	// Pause planet counter rotation if any selected.
	useEffect(() =>{
		if (planet_elem.current !== null && planet_elem.current.getAnimations().length > 0) {

			let animation = planet_elem.current.getAnimations()[0]
			if (is_any_planet_selected) {
				animation.pause()
			}
			else {
				animation.play()
			}
		}
	}, [is_any_planet_selected])


	const zoomToPlanet = () => {
		if (is_any_planet_selected && is_this_planet_selected === false) {
			return
		}

		if (is_this_planet_selected) {		
			props.zoomToPlanet(-1, new Vec2D())
		}
		else {
			props.zoomToPlanet(props.planet_index, {
				x: -(planet_pos.current.x - props.solar_system_center.x),
				y: -(planet_pos.current.y - props.solar_system_center.y)
			})
		}
	}
	

	// Render
	// console.log('orbit render')
	const angle_step = (Math.PI * 2) / props.planet_count
	const angle = angle_step * props.planet_index

	// Planet
	let planet_style: CSSProperties
	{
		const main_orbit_diameter = props.main_orbit_diameter / 2 * props.scale;

		let x = Math.sin(angle) * main_orbit_diameter
		let y = Math.cos(angle) * main_orbit_diameter
		x += props.solar_system_center.x
		y += props.solar_system_center.y
		x += props.offset.x * props.scale
		y += props.offset.y * props.scale

		planet_pos.current = { x: x, y: y}

		planet_style = {
			width: `${props.planet_size}px`,
			height: `${props.planet_size}px`,
			transform: `
				translate(${x - props.planet_size / 2}px, ${y - props.planet_size / 2}px)
				scale(${props.scale})
			`
		}
	}

	let orbit_style: CSSProperties
	{
		let main_orbit_radius: number;
		
		if (is_this_planet_selected) {
			main_orbit_radius = props.main_orbit_diameter * props.scale
		}
		else {
			main_orbit_radius = props.main_orbit_diameter / 2 * props.scale
		}

		const main_orbit_half_radius = main_orbit_radius / 2

		let x = Math.sin(angle) * main_orbit_half_radius
		let y = Math.cos(angle) * main_orbit_half_radius
		x += props.solar_system_center.x
		y += props.solar_system_center.y
		x += props.offset.x * props.scale
		y += props.offset.y * props.scale

		const orbit_diameter = props.main_orbit_diameter / 2

		orbit_style = {
			width: `${props.main_orbit_diameter / 2}px`,
			height: `${props.main_orbit_diameter / 2}px`,
			transform: `
				translate(${x - orbit_diameter / 2}px, ${y - orbit_diameter / 2}px)
				scale(${props.scale})
			`
		}
	}

	// Labels
	let label_styles: CSSProperties[] = []
	{
		const label_count = props.labels.length
		const label_length = props.main_orbit_diameter / 4
		let angle = 0
		let angle_step = 360 / label_count

		for (let i = 0; i < label_count; i++) {

			let transform: string | undefined = is_this_planet_selected ? `rotate(${angle}deg)` : `rotate(-90deg)`
			let opacity: number = is_this_planet_selected ? 1 : 0

			let new_label_style: CSSProperties = {
				top: '50%',
				left: `50%`,
				paddingLeft: `${props.planet_size / 2 + label_padding}px`,
				paddingRight: `${label_padding}px`,
				width: `${label_length}px`,
				transform: transform,
				opacity: opacity
			}

			label_styles.push(new_label_style);

			// Advance
			angle += angle_step
		}
	}

	return <>
		<div className={'orbit'} ref={orbit_elem} style={orbit_style}
			onClick={zoomToPlanet}>
			<div className="spining">
				{label_styles.map((label_style, index) => {
					return (
						<label style={label_style} key={index}>
							{props.labels[index]}
						</label>
					)
				})}
			</div>
		</div>
		<div className="planet" style={planet_style}>
			<img ref={planet_elem}
				src={props.icon} alt=""
				onClick={zoomToPlanet}
			/>
		</div>
	</>
}


class Planet {
	title: string = ''
	icon: string = ''
	labels?: string[] = []
}

interface SolarSystemProps {
	sun_icon: string
	sun_size: number
	name: string
	diameter: number
	planet_size: number
	
	planets: Planet[]
}

function SolarSystem(props: SolarSystemProps)
{
	/** How much time one revolution should take in miliseconds. */
	const solar_system_spin_time = 60_000
	const zoom_scale = 2

	const [selected_planet, setSelectedPlanet] = useState(-2)
	const [offset, setOffset] = useState(new Vec2D())
	const [scale, setScale] = useState(1)
	
	const spinner_size_ref = useRef(0)

	const solar_system_elem = useRef<HTMLDivElement>(null)
	const spinner_elem = useRef<HTMLDivElement>(null)
	const sun_img_elem = useRef<HTMLImageElement>(null)


	useEffect(() => {
		// Spinner
		{
			// Set spinner size to minimum of width or height
			let orbit_rect = solar_system_elem.current?.getBoundingClientRect()!
			let size = 0;

			if (orbit_rect.width > orbit_rect.height) {
				size = orbit_rect.height
			}
			else {
				size = orbit_rect.width
			}

			let spinner = spinner_elem.current!
			spinner.style.width = `${size}px`
			spinner.style.height = `${size}px`

			spinner_size_ref.current = size

			// Rotate spinner
			if (spinner.getAnimations().length === 0) {
				spinner.animate([
					{
						transform: 'rotate(0deg)'
					},
					{
						transform: 'rotate(360deg)'
					}
				], {
					duration: solar_system_spin_time,
					iterations: Infinity
				})
			}	
		}

		// Sun
		{
			const sun = sun_img_elem.current!
			if (sun.getAnimations().length === 0) {
				sun.animate([
					{
						transform: 'rotate(0deg)'
					},
					{
						transform: 'rotate(-360deg)'
					}
				], {
					duration: solar_system_spin_time,
					iterations: Infinity
				})
			}
		}

		// Trigger re-rendering
		setSelectedPlanet(-1)

		// window.addEventListener('resize', calculate)
		// return () => {
		// 	window.removeEventListener('resize', calculate)
		// }
	}, [])


	const zoomToPlanet = (new_selected_planet: number, planet_pos: Vec2D) => {
		let spinner_animation = spinner_elem.current!.getAnimations()[0]
		let sun_animation = sun_img_elem.current!.getAnimations()[0]

		if (new_selected_planet === -1 || selected_planet === new_selected_planet) {

			setScale(1)
			setOffset({x: 0, y: 0})
			setSelectedPlanet(-1)

			spinner_animation.play()
			sun_animation.play()
		}
		else {
			setScale(zoom_scale)
			setOffset(planet_pos)
			setSelectedPlanet(new_selected_planet)

			spinner_animation.pause()
			sun_animation.pause()
		}
	}


	// Render
	// console.log("render")

	const size = spinner_size_ref.current
	const main_orbit_center = (size - props.diameter) / 2;
	let main_orbit_style: CSSProperties = {
		width: `${props.diameter}px`,
		height: `${props.diameter}px`,
		transform: `
		translate(${main_orbit_center + offset.x * scale}px, ${main_orbit_center + offset.y * scale}px)
		scale(${scale})
		`,
	}
	
	const solar_system_center = size / 2
	let orbits: React.ReactNode = <>
		{props.planets.map((planet, index) => {
			return (
				<Orbit key={index}
					title={planet.title}
					icon={planet.icon}
					labels={planet.labels ?? []}

					scale={scale}
					offset={offset}

					solar_system_center={{x: solar_system_center, y: solar_system_center}}
					solar_system_size={size}
					solar_system_revolution_duration={solar_system_spin_time}

					main_orbit_diameter={props.diameter}

					selected_planet={selected_planet}
					planet_index={index}
					planet_count={props.planets.length}
					planet_size={props.planet_size}

					zoomToPlanet={zoomToPlanet}
				/>
			)
		})}
	</>

	const sun_center = (size - props.sun_size) / 2
	const sun_style: CSSProperties = {
		width: `${props.sun_size}px`,
		height: `${props.sun_size}px`,
		transform: `
			translate(${sun_center + offset.x * scale}px, ${sun_center + offset.y * scale}px)
			scale(${scale})
		`,
	}
	const sun_img_style: CSSProperties = {
		borderRadius: `${props.sun_size / 2}px`,
	}

	return (
		<div className="SolarSystem" ref={solar_system_elem}>
			<div className="spinner" ref={spinner_elem}>
				<div className="main-orbit" style={main_orbit_style} />
				{orbits}
				<div className="sun" style={sun_style}>
					<img ref={sun_img_elem}
						src={props.sun_icon} alt=""
						style={sun_img_style}
					/>
				</div>
			</div>
		</div>
	)
}

export default SolarSystem