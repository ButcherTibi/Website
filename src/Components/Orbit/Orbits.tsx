import React, { CSSProperties, useEffect, useRef, useState } from "react";

import './Orbits.scss'


class Vec2D {
	x: number = 0
	y: number = 0
}

interface OrbitProps {
	title: string
	icon: string

	scale: number
	offset: Vec2D

	solar_system_center: Vec2D
	solar_system_size: number

	main_orbit_diameter: number

	selected_planet: number
	planet_index: number
	planet_count: number
	planet_size: number
	
	selectPlanet: (selected_planet: number, planet_pos: Vec2D) => void
}

export function Orbit(props: OrbitProps)
{
	const planet_pos = useRef(new Vec2D())


	const selectPlanet = () => {
		if (props.selected_planet !== -1 && props.selected_planet !== props.planet_index) {
			return
		}

		props.selectPlanet(props.planet_index, {
			x: -(planet_pos.current.x - props.solar_system_center.x),
			y: -(planet_pos.current.y - props.solar_system_center.y)
		})
	}
	
	// Render
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
			height: `${props.planet_size}`,
			transform: `
				translate(${x - props.planet_size / 2}px, ${y - props.planet_size / 2}px)
				scale(${props.scale})
			`
		}
	}

	let orbit_style: CSSProperties
	{
		let main_orbit_radius: number; 
		
		if (props.selected_planet === props.planet_index) {
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

	return <>
		<div className="orbit" style={orbit_style} />
		<img className="planet"
			src={props.icon} alt=""
			onClick={selectPlanet}
			style={planet_style} />
	</>
}


class Planet {
	title: string = ''
	icon: string = ''
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
	const spin_speed = 60_000
	const zoom_scale = 2

	const [selected_planet, setSelectedPlanet] = useState(-2)
	const [offset, setOffset] = useState(new Vec2D())
	const [scale, setScale] = useState(1)
	
	const spinner_size_ref = useRef(0)
	const spinner_animation_ref = useRef<Animation>();

	const orbit_elem = useRef<HTMLDivElement>(null)
	const spinner_elem = useRef<HTMLDivElement>(null)
	

	useEffect(() => {
		// Spinner
		{
			// Set spinner size to minimum of width or height
			let orbit_rect = orbit_elem.current?.getBoundingClientRect()!
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
				spinner_animation_ref.current = spinner.animate([
					{
						transform: 'rotate(0deg)'
					},
					{
						transform: 'rotate(360deg)'
					}
				], {
					duration: spin_speed,
					iterations: Infinity
				})
			}
		}

		setSelectedPlanet(-1)
		// calculate();

		// window.addEventListener('resize', calculate)
		// return () => {
		// 	window.removeEventListener('resize', calculate)
		// }
	}, [])


	const selectPlanet = (index: number, planet_pos: Vec2D) => {
		if (selected_planet !== index) {
			spinner_animation_ref.current?.pause()
			setScale(zoom_scale)
			setOffset(planet_pos)
			setSelectedPlanet(index)
		}
		else {
			spinner_animation_ref.current?.play()
			setScale(1)
			setOffset({x: 0, y: 0})
			setSelectedPlanet(-1)
		}
	}


	// Render
	console.log("render")

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

					scale={scale}
					offset={offset}

					solar_system_center={{x: solar_system_center, y: solar_system_center}}
					solar_system_size={size}

					main_orbit_diameter={props.diameter}

					selected_planet={selected_planet}
					planet_index={index}
					planet_count={props.planets.length}
					planet_size={props.planet_size}

					selectPlanet={selectPlanet}
				/>
			)
		})}
	</>

	const sun_center = (size - props.sun_size) / 2
	let sun_style: CSSProperties = {
		width: `${props.sun_size}px`,
		height: `${props.sun_size}px`,
		borderRadius: `${props.sun_size / 2}px`,
		transform: `
			translate(${sun_center + offset.x * scale}px, ${sun_center + offset.y * scale}px)
			scale(${scale})
		`,
	}

	return (
		<div className="SolarSystem" ref={orbit_elem}>
			<div className="spinner" ref={spinner_elem}>
				<div className="main-orbit" style={main_orbit_style} />
				{orbits}
				<img className="sun"
					src={props.sun_icon} alt=""
					style={sun_style}
				/>
			</div>
		</div>
	)
}

export default SolarSystem