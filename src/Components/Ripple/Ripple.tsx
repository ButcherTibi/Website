import React, { CSSProperties, useEffect, useLayoutEffect, useRef } from "react";

import './Ripple.scss'


interface RippleProps {
	class_name?: string
	z_index?: number
	color?: string
	inner_radius?: number

	/** Duration in miliseconds. */
	duration?: number
}

function Ripple(props: RippleProps)
{
	const z_index = props.z_index ?? 'initial'
	const color = props.color ?? 'black'
	const inner_radius = props.inner_radius ?? 93
	const duration = props.duration ?? 1000


	const wrapper_ref = useRef<HTMLDivElement>(null)
	const ripple_ref = useRef<HTMLDivElement>(null)

	const enlarge = () => {
		let rect = wrapper_ref.current?.getBoundingClientRect()!
		let radius = rect.width > rect.height ? rect.width : rect.height

		let style = ripple_ref.current?.style!
		style.top = `${(rect.height - radius) / 2}px`
		style.left = `${(rect.width - radius) / 2}px`
		style.width = `${radius}px`
		style.height = `${radius}px`
		style.transform = `scale(1.5)`
	} 

	useEffect(() => {
		enlarge()
		window.addEventListener('resize', enlarge)

		return () => {
			window.removeEventListener('resize', enlarge)
		}
	}, [])

	// Render
	let ripple_style: CSSProperties = {
		background: `radial-gradient(circle closest-side,
			transparent ${inner_radius}%,
			${color} 99%,
			transparent
		)`,
		transition: `transform ${duration}ms`
	}

	return (
		<div className="Ripple" ref={wrapper_ref}
		style={{zIndex: z_index}}>
			<div ref={ripple_ref} style={ripple_style}></div>
		</div>
	)
}

export default Ripple;