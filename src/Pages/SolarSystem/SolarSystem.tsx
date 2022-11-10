import React, { useState } from "react"

import SolarSystem from "../../Components/Orbit/Orbits"
import Slider, { SliderProps } from "../../Components/Slider/Slider"
import TextInput from '../../Components/TextInput/TextInput'
import { blend } from "../../Common"

import typescript_icon from '../../Resources/icons8-typescript-96.svg'
// import javascript_icon from '../../Resources/icons8-javascript-96.svg'
// import react_icon from '../../Resources/icons8-react-160.png'
// import html_icon from '../../Resources/icons8-html-5-96.svg'
// import css_icon from '../../Resources/icons8-css3-96.svg'
// import csharp_icon from '../../Resources/C_sharp.svg'
// import ef_core_icon from '../../Resources/ef_core.png'

import './SolarSystem.scss'


class MoonSettings {
	key = ''
	text = ''
	icon = ''
}

class PlanetSettings {
	key = ''
	name = ''
	icon = ''
	moons: MoonSettings[] = []
}

const init_planets: PlanetSettings[] = [
	{
		key: '0',
		name: 'Planet 1',
		icon: typescript_icon,
		moons: [
			{
				key: '0',
				text: 'Moon 1',
				icon: typescript_icon
			},
			{
				key: '1',
				text: 'Moon 2',
				icon: typescript_icon
			},
			{
				key: '2',
				text: 'Moon 3',
				icon: typescript_icon
			}
		]
	},
	{
		key: '1',
		name: 'Planet 2',
		icon: typescript_icon,
		moons: [
			{
				key: '0',
				text: 'Moon 1',
				icon: typescript_icon
			},
			{
				key: '1',
				text: 'Moon 2',
				icon: typescript_icon
			},
			{
				key: '2',
				text: 'Moon 3',
				icon: typescript_icon
			}
		]
	},
	{
		key: '2',
		name: 'Planet 3',
		icon: typescript_icon,
		moons: [
			{
				key: '0',
				text: 'Moon 1',
				icon: typescript_icon
			},
			{
				key: '1',
				text: 'Moon 2',
				icon: typescript_icon
			},
			{
				key: '2',
				text: 'Moon 3',
				icon: typescript_icon
			}
		]
	},
	{
		key: '3',
		name: 'Planet 4',
		icon: typescript_icon,
		moons: [
			{
				key: '0',
				text: 'Moon 1',
				icon: typescript_icon
			},
			{
				key: '1',
				text: 'Moon 2',
				icon: typescript_icon
			},
			{
				key: '2',
				text: 'Moon 3',
				icon: typescript_icon
			}
		]
	},
	{
		key: '4',
		name: 'Planet 5',
		icon: typescript_icon,
		moons: [
			{
				key: '0',
				text: 'Moon 1',
				icon: typescript_icon
			},
			{
				key: '1',
				text: 'Moon 2',
				icon: typescript_icon
			},
			{
				key: '2',
				text: 'Moon 3',
				icon: typescript_icon
			}
		]
	},
	{
		key: '5',
		name: 'Planet 6',
		icon: typescript_icon,
		moons: [
			{
				key: '0',
				text: 'Moon 1',
				icon: typescript_icon
			},
			{
				key: '1',
				text: 'Moon 2',
				icon: typescript_icon
			},
			{
				key: '2',
				text: 'Moon 3',
				icon: typescript_icon
			}
		]
	},
]

class SetDecoRingsArgs {
	diameter?: number = 800
	thickness?: number = 2
	offset_from_center?: number = 70
	revolution_duration_ms?: number = 30_000
	start_angle?: number = 0

	line_count?: number = 4
	line_length?: number = 30
	line_thickness?: number = 7
	line_spacing?: number = 0

	inner_circle_diameter?: number = 700
	inner_circle_dash_length?: number = 50
	inner_circle_dash_gap?: number = 50
	inner_circle_thickness?: number = 2
	inner_circle_revolution_duration_ms?: number = 30_000
}

class DecoRingSettings {
	key = ''
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

const init_deco_rings: DecoRingSettings[] = [
	{
		key: '0',
		diameter: 1100,
		thickness: 2,
		offset_from_center: 150,
		revolution_duration_ms: blend(20_000, 40_000, 0),
		start_angle: blend(0, 360, 0),
					
		line_count: 8,
		line_length: 35,
		line_thickness: 5,
		line_spacing: 15,

		inner_circle_diameter: 1050,
		inner_circle_dash_length: 200,
		inner_circle_dash_gap: 400,
		inner_circle_thickness: 2,
		inner_circle_revolution_duration_ms: 60_000
	},
	{
		key: '1',
		diameter: 1100,
		thickness: 2,
		offset_from_center: 150,
		revolution_duration_ms: blend(20_000, 40_000, 0.5),
		start_angle: blend(0, 360, 0.5),
					
		line_count: 8,
		line_length: 35,
		line_thickness: 5,
		line_spacing: 15,

		inner_circle_diameter: 1050,
		inner_circle_dash_length: 200,
		inner_circle_dash_gap: 400,
		inner_circle_thickness: 2,
		inner_circle_revolution_duration_ms: 60_000
	},
	{
		key: '2',
		diameter: 1100,
		thickness: 2,
		offset_from_center: 150,
		revolution_duration_ms: blend(20_000, 40_000, 1),
		start_angle: blend(0, 360, 1),
					
		line_count: 8,
		line_length: 35,
		line_thickness: 5,
		line_spacing: 15,

		inner_circle_diameter: 1050,
		inner_circle_dash_length: 200,
		inner_circle_dash_gap: 400,
		inner_circle_thickness: 2,
		inner_circle_revolution_duration_ms: 60_000
	},
]


const SolarSystemDemo = () => {
	
	const [zoom_scale, setZoomScale] = useState(2)
	const [orbit_diameter, setOrbitDiameter] = useState(600)
	const [revolution_duration, setRevolutionDuration] = useState(60_000)

	const [sun_diameter, setSunDiameter] = useState(100)
	const [sun_name, setSunName] = useState('Sun name')
	const [sun_name_size, setSunNameSize] = useState(22)
	const [sun_name_spacing, setSunNameSpacing] = useState(40)
	const [corona_diameter, setCoronaDiameter] = useState(150)

	const [planet_diameter, setPlanetDiameter] = useState(75)
	const [planet_name_size, setPlanetNameSize] = useState(16)
	const [planet_name_spacing, setPlanetNameSpacing] = useState(10)
	const [planets, setPlanets] = useState<PlanetSettings[]>(init_planets)
	const [moon_diameter, setMoonDiameter] = useState(50)

	const [deco_rings, setDecoRings] = useState(init_deco_rings)


	const applyInitialPreset = () => {

	}

	const addPlanet = () => {
		setPlanets(prev => {
			return [
				...prev,
				{
					key: Date.now().toString(),
					name: 'New planet',
					icon: typescript_icon,
					moons: []
				}
			]
		})
	}

	const setPlanetName = (planet_key: string, new_name: string) => {
		setPlanets(prev => {
			return prev.map(planet => {
				let result = { ...planet }

				if (planet.key === planet_key) {
					result.name = new_name
				}
				return result
			})
		})
	}

	const deletePlanet = (key: string) => {
		setPlanets(prev => {
			return prev.filter((planet) => {
				return planet.key !== key
			})
		})
	}

	const addMoon = (planet_key: string) => {
		setPlanets(prev => {
			return prev.map(planet => {
				let new_planet = { ...planet }

				if (planet.key === planet_key) {
					new_planet.moons = [
						...new_planet.moons,
						{
							key: Date.now().toString(),
							text: 'New moon',
							icon: typescript_icon
						}
					]
				}

				return new_planet
			})
		})
	}

	const setMoonName = (planet_key: string, moon_key: string, new_name: string) => {
		setPlanets(prev => {
			return prev.map(planet => {
				let new_planet = { ...planet }

				if (planet.key === planet_key) {
					new_planet.moons = planet.moons.map(moon => {
						let new_moon = { ...moon }

						if (moon.key === moon_key) {
							new_moon.text = new_name
						}

						return new_moon
					})
				}

				return new_planet
			})
		})
	}

	const deleteMoon = (planet_key: string, moon_key: string) => {
		setPlanets(prev => {
			return prev.map(planet => {
				let new_planet = { ...planet }

				if (planet.key === planet_key) {
					new_planet.moons = new_planet.moons.filter(moon => {
						return moon.key !== moon_key
					})
				}

				return new_planet
			})
		})
	}

	const addDecoRing = () => {
		setDecoRings(prev => {
			return [
				...prev,
				{
					key: Date.now().toString(),
					diameter: 1100,
					thickness: 2,
					offset_from_center: 150,
					revolution_duration_ms: blend(20_000, 40_000, 1),
					start_angle: blend(0, 360, 1),
								
					line_count: 8,
					line_length: 35,
					line_thickness: 5,
					line_spacing: 15,

					inner_circle_diameter: 1050,
					inner_circle_dash_length: 200,
					inner_circle_dash_gap: 400,
					inner_circle_thickness: 2,
					inner_circle_revolution_duration_ms: 60_000
				}
			]
		})
	}

	const setDecoRing = (deco_ring_key: string, changed_params: SetDecoRingsArgs) => {
		setDecoRings(prev => {
			return prev.map(deco_ring => {
				let new_deco_ring = { ...deco_ring }

				if (deco_ring.key === deco_ring_key) {

					for (let param in changed_params) {
						let changed_param = (changed_params as any)[param]
						if (changed_param !== undefined) {
							(new_deco_ring as any)[param] = changed_param
						}
					}
				}

				return new_deco_ring
			})
		})
	}

	const deleteDecoRing = (deco_ring_key: string) => {
		setDecoRings(prev => {
			return prev.filter(deco_ring => {
				return deco_ring.key !== deco_ring_key
			})
		})
	}

	// Render
	const common_slider_props = {
		show_numeric_input: true
	}

	return <>
		<div className="solsys-container">
			<SolarSystem
				zoom_scale={zoom_scale}

				sun_icon={typescript_icon}
				sun_diameter={sun_diameter}
				sun_name={sun_name}
				sun_name_size={sun_name_size}
				sun_name_spacing={sun_name_spacing}
				corona_diameter={corona_diameter}

				solar_system_diameter={orbit_diameter}
				solar_system_spin_time={revolution_duration}

				planet_diameter={planet_diameter}
				planet_name_size={planet_name_size}
				planet_name_spacing={planet_name_spacing}
				planets={planets.map(planet => {
					return {
						name: planet.name,
						icon: planet.icon,
						moons: planet.moons.map(moon => {
							return {
								text: moon.text,
								icon: moon.icon
							}
						})
					}
				})}
				moon_diameter={moon_diameter}

				deco_rings={deco_rings}

				z_index={1}
			/>
		</div>

		<main className="solsys-demo content-wrap">
			<div className="editor content">
				<div className="descripton">
					<h3><code>SolarSystem</code> component</h3>
					<p>The component renders a solar system with sun, planets and moons.</p>
					<p>You can click on a planet to zoom in to that planet and show a moon.</p>
					<p>Use the fields below to alter the component's apperance.</p>
				</div>

				<div className="presets">
					<h3>Presets</h3>
					<div className="preset-list">
						<button onClick={applyInitialPreset}>Initial</button>
					</div>
				</div>

				<div className="params">
					<h3>General settings</h3>
					<div>
						<label>Zoom factor</label>
						<Slider
							{...common_slider_props}
							value={zoom_scale}
							onValueChange={value => setZoomScale(value)}
							min={0.1}
							max={10}
						/>
					</div>
					<div>
						<label>Orbit diameter</label>
						<Slider
							{...common_slider_props}
							value={orbit_diameter}
							onValueChange={value => setOrbitDiameter(value)}
							min={100}
							max={1000}
						/>
					</div>
					<div>
						<label>Revolution duration (seconds)</label>
						<Slider
							{...common_slider_props}
							value={revolution_duration / 1000}
							onValueChange={value => setRevolutionDuration(value * 1000)}
							min={2}
							max={120}
						/>
					</div>
				</div>

				<div className="params">
					<h3>Sun settings</h3>
					<div>
						<label>Sun diameter</label>
						<Slider
							{...common_slider_props}
							value={sun_diameter}
							onValueChange={value => setSunDiameter(value)}
							min={0}
							max={300}
						/>
					</div>
					<div className="sun-name-param">
						<label>Sun name</label>
						<TextInput
							value={sun_name}
							onValueChange={value => setSunName(value)}
						/>
					</div>
					<div>
						<label>Sun name size</label>
						<Slider
							{...common_slider_props}
							value={sun_name_size}
							onValueChange={value => setSunNameSize(value)}
							min={0}
							max={75}
						/>
					</div>
					<div>
						<label>Sun name spacing</label>
						<Slider
							{...common_slider_props}
							value={sun_name_spacing}
							onValueChange={value => setSunNameSpacing(value)}
							min={0}
							max={100}
						/>
					</div>
					<div>
						<label>Corona diameter</label>
						<Slider
							{...common_slider_props}
							value={corona_diameter}
							onValueChange={value => setCoronaDiameter(value)}
							min={0}
							max={600}
						/>
					</div>
				</div>

				<div className="params">
					<h3>Planet settings</h3>
					<div>
						<label>Planet diameter</label>
						<Slider
							{...common_slider_props}
							value={planet_diameter}
							onValueChange={value => setPlanetDiameter(value)}
							min={1}
							max={300}
						/>
					</div>
					<div>
						<label>Planet name size</label>
						<Slider
							{...common_slider_props}
							value={planet_name_size}
							onValueChange={value => setPlanetNameSize(value)}
							min={1}
							max={50}
						/>
					</div>
					<div>
						<label>Planet name spacing</label>
						<Slider
							{...common_slider_props}
							value={planet_name_spacing}
							onValueChange={value => setPlanetNameSpacing(value)}
							min={0}
							max={50}
						/>
					</div>
					<div className="planet-list-param">
						<label>Planets</label>
						<ul className="planets">
							{planets.map((planet, index) => {
								return <li className="planet" key={planet.key}>
									<h4>{`Planet ${index + 1}`}</h4>
									<div className="planet-param">
										<label>Planet name</label>
										<TextInput
											value={planet.name}
											onValueChange={value => setPlanetName(planet.key, value)}
										/>
									</div>
									<div className="moons-param">
										<ul className="moons">
											{planet.moons.map(moon => {
												return <li className="moon" key={moon.key}>
													<div className="moon-param">
														<label>Moon text</label>
														<TextInput
															value={moon.text}
															onValueChange={value => setMoonName(planet.key, moon.key, value)}
														/>
													</div>
													<button className="delete-btn moon-btn"
														onClick={() => deleteMoon(planet.key, moon.key)}>
														Delete moon
													</button>
												</li>
											})}
										</ul>
										<button className="add-btn moon-btn"
											onClick={() => addMoon(planet.key)}>
											Add moon
										</button>
									</div>
									<button className="delete-btn planet-btn"
										onClick={() => deletePlanet(planet.key)}>
										Delete planet
									</button>
								</li>
							})}
						</ul>
						<button className="add-btn planet-btn"
							onClick={addPlanet}>
							Add planet
						</button>
					</div>
					<div>
						<label>Moon diameter</label>
						<Slider
							{...common_slider_props}
							value={moon_diameter}
							onValueChange={value => setMoonDiameter(value)}
							min={0}
							max={150}
						/>
					</div>
				</div>

				<div className="params">
					<h3>Decorative rings settings</h3>
					<ul className="deco-rings">
						{deco_rings.map((deco_ring, index) => {
							return <li className="deco-ring" key={deco_ring.key}>
								<h3>{`Ring ${index + 1}`}</h3>
								<div>
									<h4>Ring settings</h4>
									<div>
										<label>Diameter</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.diameter}
											onValueChange={value => setDecoRing(deco_ring.key, { diameter: value })}
											min={0}
											max={1500}
										/>
									</div>
									<div>
										<label>Thickness</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.thickness}
											onValueChange={value => setDecoRing(deco_ring.key, { thickness: value })}
											min={0}
											max={25}
										/>
									</div>
									<div>
										<label>Offset from center</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.offset_from_center}
											onValueChange={value => setDecoRing(deco_ring.key, { offset_from_center: value })}
											min={0}
											max={600}
										/>
									</div>
									<div>
										<label>Revolution duration (miliseconds)</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.revolution_duration_ms}
											onValueChange={value => setDecoRing(deco_ring.key, { revolution_duration_ms: value })}
											min={500}
											max={60_000}
										/>
									</div>
								</div>

								<div>
									<h4>Line settings</h4>
									<div>
										<label>Line count</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.line_count}
											onValueChange={value => setDecoRing(deco_ring.key, { line_count: value })}
											min={0}
											max={50}
										/>
									</div>
									<div>
										<label>Length</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.line_length}
											onValueChange={value => setDecoRing(deco_ring.key, { line_length: value })}
											min={0}
											max={100}
										/>
									</div>
									<div>
										<label>Thickness</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.line_thickness}
											onValueChange={value => setDecoRing(deco_ring.key, { line_thickness: value })}
											min={0}
											max={25}
										/>
									</div>
									<div>
										<label>Spacing</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.line_spacing}
											onValueChange={value => setDecoRing(deco_ring.key, { line_spacing: value })}
											min={0}
											max={150}
										/>
									</div>
								</div>

								<div>
									<h4>Inner circle settings</h4>
									<div>
										<label>Diameter</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.inner_circle_diameter}
											onValueChange={value => setDecoRing(deco_ring.key, { inner_circle_diameter: value })}
											min={0}
											max={1500}
										/>
									</div>
									<div>
										<label>Dash length</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.inner_circle_dash_length}
											onValueChange={value => setDecoRing(deco_ring.key, { inner_circle_dash_length: value })}
											min={0}
											max={500}
										/>
									</div>
									<div>
										<label>Dash gap</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.inner_circle_dash_gap}
											onValueChange={value => setDecoRing(deco_ring.key, { inner_circle_dash_gap: value })}
											min={0}
											max={500}
										/>
									</div>
									<div>
										<label>Thickness</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.inner_circle_thickness}
											onValueChange={value => setDecoRing(deco_ring.key, { inner_circle_thickness: value })}
											min={0}
											max={25}
										/>
									</div>
									<div>
										<label>Revolution duration (miliseconds)</label>
										<Slider
											{...common_slider_props}
											value={deco_ring.inner_circle_revolution_duration_ms}
											onValueChange={value => setDecoRing(deco_ring.key, { inner_circle_revolution_duration_ms: value })}
											min={50}
											max={60_000}
										/>
									</div>
								</div>
								<button
									onClick={() => deleteDecoRing(deco_ring.key)}>
									Delete decorative ring
								</button>
							</li>
						})}
					</ul>
					<button
						onClick={addDecoRing}>
						Add decorative ring
					</button>
				</div>
			</div>
		</main>
	</>
}

export default SolarSystemDemo