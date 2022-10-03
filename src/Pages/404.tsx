import React from "react";
import { Link } from "react-router-dom";


function NotFoundPage()
{
	return <>
		<h1>404 Rută negăsită</h1>
		<h3>Rute existente</h3>
		<ul>
			<li><Link to='Accordion'>Accordion</Link></li>
			<li><Link to='CardList'>CardList</Link></li>
			<li><Link to='DropDown'>DropDown</Link></li>
			<li><Link to='MenuPage'>MenuPage</Link></li>
			<li><Link to='Slider'>Slider</Link></li>
		</ul>
	</>;
};

export default NotFoundPage