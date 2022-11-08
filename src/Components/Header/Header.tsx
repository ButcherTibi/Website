import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { DisplayFormat } from '../../Common'

import './Header.scss'


function Header()
{
	const [, setMode] = useState<DisplayFormat>()


	const getMode = () => {
		if (window.innerWidth < 700) {
			return DisplayFormat.mobile
		}
		else {
			return DisplayFormat.desktop
		}
	}

	useEffect(() => {
		const checkWindowSize = () => {
			setMode(getMode())
		}

		checkWindowSize()
		window.addEventListener('resize', checkWindowSize)

		return () => {
			window.removeEventListener('resize', checkWindowSize)
		}
	}, [])

	// Render
	switch (getMode()) {
		case DisplayFormat.desktop: {
			return (
				<header className="content-wrap">
					<div className="content">
						<NavLink className={'name'} to={'/'}><h3>Măcelaru Tiberiu</h3></NavLink>
						<div className='job'>
							<h3>Frontend Developer</h3>
						</div>
					</div>
				</header>
			)
		}
		case DisplayFormat.mobile: {
			return (
				<header className='mobile content-wrap'>
					<div className='content'>
						<div className='name'>
							<NavLink to={'/'}><h3>Măcelaru Tiberiu</h3></NavLink>
						</div>
					</div>
				</header>
			)
		}
		default: {
			return null
		}
	}
}

export default Header