import React, { CSSProperties, useEffect, useRef, useState } from "react";

import './Orbits.scss'


class Vec2D {
	x: number = 0
	y: number = 0
}

interface OrbitProps {
	title?: string
	icon: string
	radius: number
	planet_size: number
	
	inner_x: number
	inner_y: number
	outer_x: number
	outer_y: number
}

export function Orbit(props: OrbitProps)
{
	let orbit_style: CSSProperties = {
		top: `${props.inner_y}px`,
		left: `${props.inner_x}px`,
		width: `${props.radius}px`,
		height: `${props.radius}px`
	}

	let planet_style: CSSProperties = {
		top: `${props.outer_y - (props.planet_size / 2)}px`,
		left: `${props.outer_x - (props.planet_size / 2)}px`,
		width: `${props.planet_size}px`,
		height: `${props.planet_size}px`,
		borderRadius: `${props.planet_size / 2}px`
	}

	return <>
		<div className="orbit" style={orbit_style} />
		<img className="planet"
			src={props.icon} alt=""
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
	size: number
	planet_size: number
	planets: Planet[]
}

class PlanetPosition {
	inner_x: number = 0
	inner_y: number = 0

	outer_x: number = 0
	outer_y: number = 0
}

function SolarSystem(props: SolarSystemProps)
{
	const [sun_position, setSunPosition] = useState<Vec2D>()
	const [orbit_position, setOrbitPosition] = useState<Vec2D>()
	const [planet_positions, setPlanetPositions] = useState<PlanetPosition[]>([])


	let orbit_ref = useRef<HTMLDivElement>(null)
	let spinner_ref = useRef<HTMLDivElement>(null)
	

	const positionPlanets = () => {
		if (orbit_ref.current === null || spinner_ref.current === null) {
			return;
		}

		let orbit_rect = orbit_ref.current?.getBoundingClientRect()!

		let size = 0
		if (orbit_rect.width > orbit_rect.height) {
			size = orbit_rect.height
		}
		else {
			size = orbit_rect.width
		}

		let circum = props.size;
		let radius = circum / 2;

		// Spinner
		let spinner = spinner_ref.current!
		spinner.style.width = `${size}px`
		spinner.style.height = `${size}px`

		// Sun
		setSunPosition({
			x: (size - props.sun_size) / 2,
			y: (size - props.sun_size) / 2
		})

		// Orbit
		setOrbitPosition({
			x: (size - circum) / 2,
			y: (size - circum) / 2,
		})

		let count = props.planets.length
		let angle_rad = 0
		let new_planet_positions: PlanetPosition[] = []
		
		for (let i = 0; i < count; i++) {

			let new_planet_position = new PlanetPosition()

			// Outer
			{
				let x = Math.sin(angle_rad) * radius;
				let y = Math.cos(angle_rad) * radius;
	
				// Normalize to top left origin
				x += size / 2
				y += size / 2
	
				new_planet_position.outer_x = x;
				new_planet_position.outer_y = y;
			}

			// Inner
			{
				let x = Math.sin(angle_rad) * (radius / 2);
				let y = Math.cos(angle_rad) * (radius / 2);
				x += size / 2
				y += size / 2

				new_planet_position.inner_x = x - radius / 2;
				new_planet_position.inner_y = y - radius / 2;
			}
			
			new_planet_positions.push(new_planet_position)

			// Advance
			angle_rad += (2 * Math.PI) / count;
		}

		setPlanetPositions(new_planet_positions)
	}


	useEffect(() => {
		positionPlanets();

		window.addEventListener('resize', positionPlanets)
		return () => {
			window.removeEventListener('resize', positionPlanets)
		}
	}, [])


	// Render
	let main_orbit_style: CSSProperties = {
		top: `${orbit_position?.x}px`,
		left: `${orbit_position?.y}px`,
		width: `${props.size}px`,
		height: `${props.size}px`
	}

	let orbits: React.ReactNode = null
	if (planet_positions.length > 0) {
		orbits = <>
			{props.planets.map((planet, index) => {
				let planet_position = planet_positions[index]
				return <Orbit key={index}
					title={planet.title}
					icon={planet.icon}
					radius={props.size / 2}
					planet_size={props.planet_size}

					inner_x={planet_position.inner_x}
					inner_y={planet_position.inner_y}
					outer_x={planet_position.outer_x}
					outer_y={planet_position.outer_y}
				/>
			})}
		</>
	}

	let sun_style: CSSProperties = {
		top: `${sun_position?.x}px`,
		left: `${sun_position?.y}px`,
		width: `${props.sun_size}px`,
		height: `${props.sun_size}px`,
		borderRadius: `${props.sun_size / 2}px`
	}

	return (
		<div className="SolarSystem" ref={orbit_ref}>
			<div className="spinner" ref={spinner_ref}>
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