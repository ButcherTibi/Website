import React, { CSSProperties } from "react";

import './FrontPage.scss';


function Leafs()
{
	const size = 500;
	const leaf_count = 10;

	let leaf_width = 50;
	let leaf_height = 50;

	
	const radius = size / 2;
	let angle = 0;
	let leafs: React.ReactNode[] = [];

	for (let i = 0; i < leaf_count; i++) {
		
		let leaf_x = Math.cos(angle) * radius;
		let leaf_y = Math.sin(angle) * radius;

		console.log(`x y = {${leaf_x}, ${leaf_y}}`);

		// Normalize to top left origin
		leaf_x += radius;
		leaf_y += radius;

		let leaf_style: CSSProperties = {
			top: `${leaf_x}px`,
			left: `${leaf_y}px`,
			width: `${leaf_width}px`,
			height: `${leaf_height}px`,
			backgroundColor: 'green'
		};

		let new_leaf = (
			<div key={i} className="leaf" style={leaf_style}>

			</div>
		);

		leafs.push(new_leaf);

		// Advance
		angle += 360 / leaf_count;
	}

	let leafs_style: CSSProperties = {
		width: `${size}px`,
		height: `${size}px`
	};

	return (
		<div className="leafs" style={leafs_style}>
			{leafs}
		</div>
	);
}

function FrontPage()
{
	return <>
		<div className="front-page">
			<Leafs />
		</div>
	</>;
}

export default FrontPage;