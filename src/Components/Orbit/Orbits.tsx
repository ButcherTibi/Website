import React, { CSSProperties, useEffect, useRef, useState } from "react";

import './Orbits.scss'


class Vec2D {
	x: number = 0
	y: number = 0
}

function clearAnimations(elem: Element)
{
	elem.getAnimations().forEach(anim => anim.cancel())
}


class DecoRingLine {
	wrap_style: CSSProperties = {}
	line_style: CSSProperties = {}
}

interface DecoRingProps {
	scale: number
	offset: Vec2D

	wrapper_size: number

	diameter: number
	thickness: number
	/** The offset used to shift the ring from it's center. */
	offset_from_center: number
	revolution_duration: number
	start_angle: number

	// Lines
	line_count: number
	line_length: number
	line_thickness: number
	line_spacing: number

	// Inner circle
	inner_circle_diameter: number
	inner_circle_dash_length: number
	inner_circle_dash_gap: number
	inner_circle_thickness: number
	inner_circle_revolution_duration_ms: number
}

function DecoRing(props: DecoRingProps)
{
	const spinning_elem = useRef<HTMLDivElement>(null)
	const ring_elem = useRef<HTMLDivElement>(null)
	const svg_elem = useRef<SVGSVGElement>(null)


	useEffect(() => {
		let spinning = spinning_elem.current!
		let ring = ring_elem.current!
		let svg = svg_elem.current!

		clearAnimations(spinning)
		clearAnimations(ring)
		clearAnimations(svg)

		// ensure you return to start_agle in a smooth way
		spinning.animate([
			{ transform: `rotate(-${props.start_angle}deg)` },
			{ transform: `rotate(-${360 + props.start_angle}deg)` }
		], {
			duration: props.revolution_duration,
			iterations: Infinity
		})

		svg.animate([
			{ transform: `rotate(-360deg)` }
		], {
			duration: props.inner_circle_revolution_duration_ms,
			iterations: Infinity
		})
	}, [
		props.revolution_duration,
		props.start_angle,
		props.inner_circle_revolution_duration_ms
	])


	// Render
	const center = (props.wrapper_size - props.diameter) / 2

	let deco_ring_style: CSSProperties = {
		width: props.diameter,
		height: props.diameter,		
		transform: `
			translate(
				${center + props.offset.x * props.scale}px,
				${center + props.offset.y * props.scale}px
			)
			scale(${props.scale})
		`
	}
	
	let ring_style: CSSProperties = {
		width: props.diameter,
		height: props.diameter,
		borderWidth: props.thickness,
		transform: `
			translate(${props.offset_from_center}px)
		`
	}

	// Lines
	let lines: DecoRingLine[] = []
	{
		const angle_step = 360 / props.line_count
		let angle = 0
	
		for (let i = 0; i < props.line_count; i++) {
	
			let new_line = new DecoRingLine()
	
			new_line.wrap_style = {
				top: props.diameter / 2 - props.thickness,
				left: props.diameter / 2 - props.thickness,	
				transform: `
					rotate(${angle}deg)
				`
			}
			new_line.line_style = {
				marginLeft: props.diameter / 2 + props.line_spacing,
				width: props.line_length,
				height: props.line_thickness,
			}
	
			lines.push(new_line)
	
			// Advance
			angle += angle_step
		}
	}

	return <>
		<div className="deco-ring"  style={deco_ring_style}>
			<div className="spinning" ref={spinning_elem} style={{transform: `rotate(-${props.start_angle}deg)`}}>
				<div className="ring" ref={ring_elem} style={ring_style}>
					{lines.map((line, index) => {
						return <div className="line-wrap" key={index}
							style={line.wrap_style}>
							<div className="line" style={line.line_style} />
						</div>
					})}
					<svg ref={svg_elem}
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						style={{overflow: 'visible'}}>
						<circle
							cx={props.diameter / 2}
							cy={props.diameter / 2}
							r={props.inner_circle_diameter / 2}
							
							strokeWidth={props.inner_circle_thickness}
							strokeDasharray={`
								${props.inner_circle_dash_length},
								${props.inner_circle_dash_gap}
							`}
						/>
					</svg>
				</div>
			</div>
		</div>
	</>
}


class Moon {
	text = ''
	icon? = ''
	icon_size? = 50
}

interface OrbitProps {
	title: string
	icon: string
	moons: Moon[]

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

	z_index: number
}


function Orbit(props: OrbitProps)
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

		clearAnimations(planet)

		planet.animate([
			{
				transform: 'rotate(-360deg)'
			}
		], {
			duration: props.solar_system_revolution_duration,
			iterations: Infinity
		})
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

	// Orbit
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
			zIndex: is_this_planet_selected ? props.z_index + 1 : undefined,
			width: `${props.main_orbit_diameter / 2}px`,
			height: `${props.main_orbit_diameter / 2}px`,
			transform: `
				translate(${x - orbit_diameter / 2}px, ${y - orbit_diameter / 2}px)
				scale(${props.scale})
			`
		}
	}

	class MoonStyle {
		div_style: CSSProperties = {}
		label_style: CSSProperties = {}
		moon_style: CSSProperties = {}
	}

	// Moon
	const moon_orbit_styles: MoonStyle[] = []
	{
		const label_count = props.moons.length
		const label_length = props.main_orbit_diameter / 4
		let angle = 0
		const angle_step = 360 / label_count

		for (let i = 0; i < label_count; i++) {

			let moon = props.moons[i]
			moon.icon_size ??= 0

			let new_style = new MoonStyle()

			const transform: string | undefined = is_this_planet_selected ? `rotate(${angle}deg)` : `rotate(-90deg)`
			const opacity: number = is_this_planet_selected ? 1 : 0

			new_style.div_style = {
				width: label_length,
				transform: transform,
				opacity: opacity
			}
			new_style.label_style = {
				marginLeft: props.planet_size / 2 + label_padding,
				marginRight: label_padding + moon.icon_size / 2,
				width: label_length
			}
			new_style.moon_style = {
				marginLeft: -moon.icon_size / 2,
				width: moon.icon_size,
				height: moon.icon_size
			}

			moon_orbit_styles.push(new_style)

			// Advance
			angle += angle_step
		}
	}

	return <>
		<div className={'orbit'} ref={orbit_elem} style={orbit_style}
			onClick={zoomToPlanet}>
			<div className="spining">
				{moon_orbit_styles.map((style, index) => {
					let moon = props.moons[index]
					return (
						<div className="moon" key={index}
							style={style.div_style}>
							<label style={style.label_style}>
								{props.moons[index].text}
							</label>
							<img src={moon.icon} style={style.moon_style} alt='' />
						</div>
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


interface CoronaRayProps {
	offset: Vec2D
	scale: number

	wrapper_size: number
	solar_system_diameter: number

	ray_count: number
	ray_index: number
}

function CoronaRay(props: CoronaRayProps)
{
	const center = props.wrapper_size / 2
	const angle_step = 360 / props.ray_count
	let angle = angle_step * props.ray_index

	const long_style: CSSProperties = {
		width: props.solar_system_diameter / 2,
		transform: `
			translate(
				${center + props.offset.x * props.scale}px,
				${center + props.offset.y * props.scale}px
			)
			rotate(${angle - angle_step / 4}deg)
			scale(${props.scale})
		`
	}
	const short_style: CSSProperties = {
		width: props.solar_system_diameter / 2,
		transform: `
			translate(
				${center + props.offset.x * props.scale}px,
				${center + props.offset.y * props.scale}px
			)
			rotate(${angle + angle_step / 4}deg)
			scale(${props.scale})
		`
	}

	return <>
		<div className="corona-long-line" style={long_style}>
			<div />
		</div>
		<div className="corona-short-line" style={short_style}>
			<div />
		</div>
	</>
}


export class PlanetSettings {
	title: string = ''
	icon: string = ''
	moons?: Moon[] = []
}

export class DecoRingSettings {
	diameter: number = 800
	thickness: number = 2
	offset_from_center: number = 70
	revolution_duration_ms: number = 30_000
	start_angle: number = 0

	line_count: number = 4
	line_length: number = 30
	line_thickness: number = 7
	line_spacing: number = 0

	inner_circle_diameter: number = 700
	inner_circle_dash_length: number = 50
	inner_circle_dash_gap: number = 50
	inner_circle_thickness: number = 2
	inner_circle_revolution_duration_ms: number = 30_000
}

interface SolarSystemProps {
	sun_icon: string
	sun_size: number
	sun_name: string
	corona_diameter: number

	solar_system_diameter: number

	planet_size: number
	planets: PlanetSettings[]

	deco_rings: DecoRingSettings[]

	z_index: number
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
					{ transform: 'rotate(360deg)' }
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
	// let key_index = 0;
	const size = spinner_size_ref.current
	const solar_system_center = size / 2

	// Deco Rings
	let deco_rings: React.ReactNode[] = props.deco_rings.map((settings, index) => {
		return <DecoRing key={'deco_ring_' + index}
			scale={scale}
			offset={offset}

			wrapper_size={size}

			diameter={settings.diameter}
			thickness={settings.thickness}
			offset_from_center={settings.offset_from_center}
			revolution_duration={settings.revolution_duration_ms}
			start_angle={settings.start_angle}

			line_count={settings.line_count}
			line_length={settings.line_length}
			line_thickness={settings.line_thickness}
			line_spacing={settings.line_spacing}

			inner_circle_diameter={settings.inner_circle_diameter}
			inner_circle_dash_length={settings.inner_circle_dash_length}
			inner_circle_dash_gap={settings.inner_circle_dash_gap}
			inner_circle_thickness={settings.inner_circle_thickness}
			inner_circle_revolution_duration_ms={settings.inner_circle_revolution_duration_ms}
		/>
	})

	// Main Orbit
	const main_orbit_center = (size - props.solar_system_diameter) / 2;
	let main_orbit_style: CSSProperties = {
		width: `${props.solar_system_diameter}px`,
		height: `${props.solar_system_diameter}px`,
		transform: `
			translate(${main_orbit_center + offset.x * scale}px, ${main_orbit_center + offset.y * scale}px)
			scale(${scale})
		`,
	}
	
	// Orbits
	let orbits: React.ReactNode = <>
		{props.planets.map((planet, index) => {
			return (
				<Orbit key={'orbit_' + index}
					title={planet.title}
					icon={planet.icon}
					moons={planet.moons ?? []}

					scale={scale}
					offset={offset}

					solar_system_center={{x: solar_system_center, y: solar_system_center}}
					solar_system_size={size}
					solar_system_revolution_duration={solar_system_spin_time}

					main_orbit_diameter={props.solar_system_diameter}

					selected_planet={selected_planet}
					planet_index={index}
					planet_count={props.planets.length}
					planet_size={props.planet_size}
					zoomToPlanet={zoomToPlanet}

					z_index={props.z_index}
				/>
			)
		})}
	</>

	// Corona	Rays
	let corona_lines: React.ReactNode = props.planets.map((_, index) => {
		return <CoronaRay
			key={index}

			offset={offset}
			scale={scale}

			wrapper_size={size}
			solar_system_diameter={props.solar_system_diameter}

			ray_count={props.planets.length}
			ray_index={index}
		/>
	})

	// Corona Circle
	let corona_circle_style: CSSProperties = {
		width: props.corona_diameter,
		height: props.corona_diameter,
		transform: `
			translate(
				${(size - props.corona_diameter) / 2 + offset.x * scale}px,
				${(size - props.corona_diameter) / 2 + offset.y * scale}px
			)
			scale(${scale})
		`,
	}

	// Sun
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
				{deco_rings}
				<div className="main-orbit" style={main_orbit_style} />
				{corona_lines}
				{orbits}
				<div className="corona-circle" style={corona_circle_style} />
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