import React, { CSSProperties, useEffect, useRef } from "react"

import { clearAnimations } from '../../Common'

import './TimelinePlanets.scss'


function extractMonthYear(date: Date): string {
	let [month, , year] =
		Intl.DateTimeFormat("ro", { year: "numeric", month: "long" })
		.formatToParts(date)
	;

	return `${month.value[0].toUpperCase() + month.value.slice(1)} ${year.value}`
}


interface ItemProps {
	company: string
	job: string
	start_date: Date
	end_date?: Date
	logo: string
	background: string
	
	// Internal
	item_index?: number
	class_name?: string
	planet_diameter?: number
	core_diameter?: number
	spiral_diameter?: number
	children?: any
}

export function Item(props: ItemProps)
{
	let start = extractMonthYear(props.start_date)
	let end = props.end_date !== undefined ? extractMonthYear(props.end_date) : 'Prezent';

	const item_style: CSSProperties = {
		height: props.spiral_diameter
	}

	const planet_style: CSSProperties = {
		width: props.planet_diameter,
		height: props.planet_diameter,
		backgroundImage: `url(${props.background})`
	}

	const core_style: CSSProperties = {
		width: props.core_diameter,
		height: props.core_diameter
	}	

	return (
		<div className='item' key={props.item_index} style={item_style}>
			<div className="timespan">
				<time>{start}</time>
				<p className="separator">-</p>
				<time>{end}</time>
			</div>
			<div className="center">
				<div className="planet" style={planet_style}>
					<div className="core" style={core_style}>
						<img src={props.logo} alt='' />
						<h3>{props.company}</h3>
					</div>
				</div>
			</div>
			<div className="job">
				<h3>{props.job}</h3>
			</div>
		</div>
	)
}

interface Props {
	planet_diameter: number
	core_diameter: number
	
	spiral_diameter: number
	spiral_border_thickness: number

	background_spiral_diameter: number
	background_border_thickness: number

	children: JSX.Element[]
}

function TimelinePlanets(props: Props)
{
	const front_spiral_svg = useRef<SVGSVGElement>(null)
	const back_spiral_svg = useRef<SVGSVGElement>(null)


	useEffect(() => {
		let front_spiral = front_spiral_svg.current!
		let back_spiral = back_spiral_svg.current!
		clearAnimations(front_spiral)
		clearAnimations(back_spiral)

		front_spiral.animate([
			{ transform: `translate(0px, ${props.spiral_diameter * 2}px)` }
		], {
			duration: 10_000,
			iterations: Infinity
		})

		back_spiral.animate([
			{ transform: `translate(0px, ${props.background_spiral_diameter * 2}px)` }
		], {
			duration: 15_000,
			iterations: Infinity,
			direction: 'reverse'
		})
	}, [props.spiral_diameter, props.background_spiral_diameter])
	

	// Render
	const count = React.Children.count(props.children)

	let style: CSSProperties = {
		height: props.spiral_diameter * count
	}

	// SVG Background Spiral
	let svg_backgrd_spiral = ''
	{
		const x_scale_factor = .2
		const right_x = props.background_spiral_diameter * (1 + x_scale_factor)
		const left_x = -props.background_spiral_diameter * x_scale_factor
		const center_x = props.background_spiral_diameter / 2

		// Începe de la a 2 buclă ca să nu se vadă tăiat
		const start_y = -props.background_spiral_diameter * 3
		let y = start_y + props.background_spiral_diameter

		svg_backgrd_spiral = `M ${center_x} ${start_y}
			C ${right_x} ${start_y} , ${right_x} ${y}, ${center_x} ${y} \n`

		y += props.background_spiral_diameter

		for (let i = 1; i < count * 2 + 1; i++) {
	
			// Right
			if (i % 2 === 0) {
				svg_backgrd_spiral += `S ${right_x} ${y}, ${center_x} ${y} \n`
			}
			// Left
			else {
				svg_backgrd_spiral += `S ${left_x} ${y}, ${center_x} ${y} \n`
			}

			y += props.background_spiral_diameter
		}
	}

	// SVG Foreground Spiral
	let svg_foregrd_spiral = ''
	let circles: any[] = []
	{
		const x_scale_factor = .2
		const right_x = props.spiral_diameter * (1 + x_scale_factor)
		const left_x = -props.spiral_diameter * x_scale_factor
		const center_x = props.spiral_diameter / 2
		
		// Începe de la a 2 buclă ca să nu se vadă tăiat
		const start_y = -props.spiral_diameter * 3
		let end_y = start_y + props.spiral_diameter

		svg_foregrd_spiral = `M ${center_x} ${start_y}
			C ${right_x} ${start_y} , ${right_x} ${end_y}, ${center_x} ${end_y} \n`

		circles.push(
			<circle key={0}
				cx={props.spiral_diameter / 2} cy={start_y + props.spiral_diameter / 2}
				r={props.spiral_diameter / 2}
				strokeWidth={props.spiral_border_thickness}
			/>
		)

		end_y += props.spiral_diameter

		for (let i = 1; i < count * 2 + 1; i++) {
	
			// Right
			if (i % 2 === 0) {
				svg_foregrd_spiral += `S ${right_x} ${end_y}, ${center_x} ${end_y} \n`
			}
			// Left
			else {
				svg_foregrd_spiral += `S ${left_x} ${end_y}, ${center_x} ${end_y} \n`
			}

			circles.push(
				<circle className={i % 2 === 0 ? 'left-arc' : 'right-arc'} key={i}
					cx={props.spiral_diameter / 2} cy={end_y - props.spiral_diameter / 2}
					r={props.spiral_diameter / 2}
					strokeWidth={props.spiral_border_thickness}
				/>
			)

			end_y += props.spiral_diameter
		}
	}

	return (
		<div className="TimelinePlanets" style={style}>
			<div className="backgrd-curve">
				<svg ref={back_spiral_svg} width={props.background_spiral_diameter} xmlns="http://www.w3.org/2000/svg">
					<linearGradient id='back_gradient'>
						<stop className="start-color" offset={'0%'} />
						<stop offset={'50%'} stopColor="transparent" />
						<stop className="end-color" offset={'100%'} />
					</linearGradient>
					<path
						d={svg_backgrd_spiral}
						strokeWidth={props.background_border_thickness}
						fill='url(#back_gradient)'
					/>
				</svg>
			</div>

			<div className="foregrd-curve">
				<svg ref={front_spiral_svg} width={props.spiral_diameter} xmlns="http://www.w3.org/2000/svg">
					<linearGradient id='fore_gradient'>
						<stop className="start-color" offset={'0%'} />
						<stop offset={'50%'} stopColor="transparent" />
						<stop className="end-color" offset={'100%'} />
					</linearGradient>
					<path
						d={svg_foregrd_spiral}
						strokeWidth={props.spiral_border_thickness}
						fill='url(#fore_gradient)'
					/>
					{circles}
				</svg>
			</div>

			<div className="items">
				{React.Children.map(props.children, (child, index) => {
					return <>
						{React.cloneElement<ItemProps>(child, {
							item_index: index,
							planet_diameter: props.planet_diameter,
							core_diameter: props.core_diameter,
							spiral_diameter: props.spiral_diameter
						})}
					</>;
				})}
			</div>
		</div>
	)
}

export default TimelinePlanets