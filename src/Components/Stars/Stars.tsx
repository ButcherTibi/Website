import React, { 
	useEffect, useState, useRef, useCallback, CSSProperties 
} from "react";

import { blend, Interval, jitter, clearAnimations } from '../../Common'

// Star SVG Image
// import star_svg from './../../Resources/Star.svg'

import './Stars.scss'


interface StarProps {
	x: number
	y: number
	angle: number
	scale: number
	opacity: Interval
	glow_duration_ms: number
}

function Star(props: StarProps) {

	const star_elem = useRef<HTMLDivElement>(null)


	useEffect(() => {
		let star = star_elem.current!
		clearAnimations(star)

		star.animate([{
			opacity: props.opacity.min
		}, {
			opacity: props.opacity.max
		}, {
			opacity: props.opacity.min
		}], {
			duration: props.glow_duration_ms,
			iterations: Infinity
			// poate adaug și delay
		})
	}, [props.opacity, props.glow_duration_ms])


	// Render
	const star_style: CSSProperties = {
		transform: `
			translate(${props.x}px, ${props.y}px)
			rotate(${props.angle}deg)
			scale(${props.scale})
		`
	}

	return (
		<div className="star" ref={star_elem} style={star_style}>
			<svg viewBox='0 0 40 39'
				xmlns="http://www.w3.org/2000/svg">
				{/* <defs>
					<radialGradient id="myGradient">
						<stop offset="20%" stop-color="white" />
						<stop offset="100%" stop-color="white" />
					</radialGradient>
				</defs> */}

				<path d="M21.068 0C21.068 0 21.3398 10.3323 25.5534 14.8946C29.767 19.4569 42 19.4569 42 19.4569C42 19.4569 30.0388 19.8594 25.5534 24.9585C21.068 30.0575 21.068 42 21.068 42C21.068 42 21.068 29.3866 16.1748 24.9585C11.2816 20.5304 0 20.3962 0 20.3962C0 20.3962 11.4175 21.4696 16.1748 14.8946C20.932 8.31949 21.068 0 21.068 0Z"
				/>
			</svg>
		</div>
		
	)
}

class StarData {
	x = 0
	y = 0
	angle = 0
	scale = 1
	opacity: Interval = new Interval()
	glow_duration_ms: number = 1000
}

interface StarsProps {
	count: number
	scale: Interval
	opacity: Interval
	glow_duration_ms: Interval
}

function Stars(props: StarsProps) {

	const [computed_stars, setComputedStars] = useState<StarData[]>([])

	const compute = useCallback(() => {
		const stars_elem = document.getElementsByClassName('Stars')[0]!
		const container = stars_elem.parentElement!
		const rect = container.getBoundingClientRect()
		
		let new_computed_stars: StarData[] = []

		for (let i = 0; i < props.count; i++) {

			const size_ratio = Math.random()
			const scale = blend(props.scale.min, props.scale.max, size_ratio)
			const size = 50 * scale

			new_computed_stars.push({
				x: jitter(0, rect.width - size * 2),  // size * 2 e aproximativ
				y: jitter(0, rect.height),
				angle: 360 * Math.random(),
				scale: scale,
				opacity: new Interval(props.opacity.min, props.opacity.max),
				glow_duration_ms: jitter(props.glow_duration_ms.min, props.glow_duration_ms.max)
			})
		}
		setComputedStars(new_computed_stars)
	}, [props.count, props.scale, props.opacity, props.glow_duration_ms]) 

	useEffect(() => {
		compute()

		window.addEventListener('resize', compute)
		return () => {
			window.removeEventListener('resize', compute)
		}
	}, [compute])

	return (
		<div className="Stars">
			{computed_stars.map((computed_star, index) => {
				return (
					<Star key={index}
						x={computed_star.x}
						y={computed_star.y}
						angle={computed_star.angle}
						scale={computed_star.scale}
						opacity={computed_star.opacity}
						glow_duration_ms={computed_star.glow_duration_ms}
					/>
				)
			})}
		</div>
	)
}

export default Stars