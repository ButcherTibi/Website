import React, { CSSProperties } from "react";

import './FrontPage.scss';


function Leafs()
{
	let leafs: React.ReactNode[] = [];

	// Surface Size
	const size = 700;
	
	// Ring Params
	const ring_count = 14;
	const ring_overlap = 0.5;
	const ring_init_size = 100;
	const ring_angle_offset_growth = 0.5;

	// Leaf Params
	const leaf_growth_factor = 1.1;
	const leaf_overlap = 0.4;
	const leaf_init_size = 50;

	let angle_offset = 0;
	let leaf_size = leaf_init_size;
	let ring_radius = ring_init_size;

	for (let r = 0; r < ring_count; r++) {

		let circum = Math.PI * (ring_radius * 2);
		let leaf_diagonal = Math.sqrt(Math.pow(leaf_size, 2) * 2);
		let leaf_count = Math.floor(circum / (leaf_diagonal * (1 - leaf_overlap)));

		let angle_rad = angle_offset;
		
		for (let i = 0; i < leaf_count; i++) {

			// Position
			let leaf_x = Math.sin(angle_rad) * ring_radius;
			let leaf_y = Math.cos(angle_rad) * ring_radius;
	
			// Normalize to top left origin
			leaf_x += size / 2 - leaf_size / 2;
			leaf_y += size / 2 - leaf_size / 2;
	
			// Size
	
			// Rotation
			let leaf_rotation = (Math.PI / 4) - angle_rad;
	
			// Shape
	
			let leaf_style: CSSProperties = {
				top: `${leaf_y}px`,
				left: `${leaf_x}px`,
				zIndex: `${leafs.length}`,
				border: `1px solid black`,
				width: `${leaf_size}px`,
				height: `${leaf_size}px`,
				transform: `rotate(${leaf_rotation}rad)`,
				backgroundColor: 'green',
				boxShadow: `0px 0px 5px 1px black`
			};
	
			let new_leaf = (
				<div key={leafs.length} className="leaf" style={leaf_style}>
	
				</div>
			);
	
			leafs.push(new_leaf);
	
			// Advance
			angle_rad += (2 * Math.PI) / leaf_count;
		}

		leaf_size *= leaf_growth_factor;
		ring_radius += leaf_diagonal * (1 - ring_overlap);
		angle_offset += ring_angle_offset_growth;
	}

	let leafs_style: CSSProperties = {
		width: `${size}px`,
		height: `${size}px`
	};

	return (
		<div className="leafs-wrap" style={{height: `${size}px`}}>
			<div className="leafs" style={leafs_style}>
				{leafs}
			</div>
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