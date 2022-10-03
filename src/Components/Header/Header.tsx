import React from 'react'

import { NavLink } from 'react-router-dom'

import './Header.scss'


function Header()
{
	return (
		<header className="content-wrap">
			<div className="content">
				<div className='name'>
					<NavLink to={'/'}><h3>Măcelaru Tiberiu</h3></NavLink>
				</div>
				<div className='work-in-progress'>
					<h3>Work in progress. Nu e gata.</h3>
				</div>
				<div className='job'>
					<h3>Front-End Developer</h3>
				</div>
			</div>
		</header>
	)
}

export default Header