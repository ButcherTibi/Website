import React, { CSSProperties, useEffect, useState } from "react";

import './FrontPage.scss';


class LeafData {
	leaf_y: number = 0;
	leaf_x: number = 0;
	z_index: number = 0;
	size: number = 0;
	rotation: number = 0;  // radians
}

class ComputedRing {
	leaf_count: number = 0;
	leafs: LeafData[] = [];
}

function Leafs()
{
	const [inited, setInited] = useState(false);
	const [begin_rings, setBeginRings] = useState<ComputedRing[]>([]);
	const [end_rings, setEndRings] = useState<ComputedRing[]>([]);


	// Surface Size
	const size = 700;
	
	// Ring Params
	const ring_count = 14;
	const ring_overlap = 0.5;
	const ring_begin_size = 100;
	const ring_angle_offset_growth = 0.5;

	// Leaf Params
	const leaf_growth_factor = 1.1;
	const leaf_overlap = 0.4;
	const leaf_init_size = 50;


	useEffect(() => {
		if (inited === false) {

			// End Leafs
			let new_end_rings: ComputedRing[] = [];
			{		
				let angle_offset = 0;
				let z_index = 0;
				let leaf_size = leaf_init_size;
				let ring_radius = ring_begin_size;

				for (let r = 0; r < ring_count; r++) {

					let circum = Math.PI * (ring_radius * 2);
					let leaf_diagonal = Math.sqrt(Math.pow(leaf_size, 2) * 2);
					let leaf_count = Math.floor(circum / (leaf_diagonal * (1 - leaf_overlap)));
			
					let angle_rad = angle_offset;

					let new_end_ring = new ComputedRing();
					new_end_ring.leaf_count = leaf_count;
					
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
				
						// Store Computation
						new_end_ring.leafs.push({
							leaf_y: leaf_y,
							leaf_x: leaf_x,
							z_index: z_index,
							size: leaf_size,
							rotation: leaf_rotation
						});
				
						// Advance Leaf
						angle_rad += (2 * Math.PI) / leaf_count;
					}

					new_end_rings.push(new_end_ring);
			
					z_index += 1;
					leaf_size *= leaf_growth_factor;
					ring_radius += leaf_diagonal * (1 - ring_overlap);
					angle_offset += ring_angle_offset_growth;
				}

				setEndRings(new_end_rings);
			}

			// Begin Leafs
			{
				let new_begin_rings: ComputedRing[] = [];
				
				let angle_offset = 0;
				let z_index = 0;
				let leaf_size = leaf_init_size;
				let ring_radius = 1000;

				for (let r = 0; r < ring_count; r++) {

					let leaf_diagonal = Math.sqrt(Math.pow(leaf_size, 2) * 2);
					let leaf_count = new_end_rings[r].leaf_count;
			
					let angle_rad = angle_offset;

					let new_computed_ring = new ComputedRing();
					new_computed_ring.leaf_count = leaf_count;
					
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
				
						// Store Computation
						new_computed_ring.leafs.push({
							leaf_y: leaf_y,
							leaf_x: leaf_x,
							z_index: z_index,
							size: leaf_size,
							rotation: leaf_rotation
						});
				
						// Advance Leaf
						angle_rad += (2 * Math.PI) / leaf_count;
					}

					new_begin_rings.push(new_computed_ring);
			
					z_index += 1;
					leaf_size *= leaf_growth_factor;
					ring_radius += leaf_diagonal * (1 - ring_overlap);
					angle_offset += ring_angle_offset_growth;
				}

				setBeginRings(new_begin_rings);
			}
			
			setInited(true);
		}
	}, [inited]);


	const close = () => {
		let leafs = document.getElementsByClassName('leaf');

		let leaf_index = 0;

		for (let r = 0; r < ring_count; r++) {
			
			let leaf_count = begin_rings[r].leaf_count;

			for (let i = 0; i < leaf_count; i++) {

				let begin = begin_rings[r].leafs[i];
				let end = end_rings[r].leafs[i];

				leafs[leaf_index].animate([
					{
						top: `${begin.leaf_y}px`,
						left: `${begin.leaf_x}px`,
					},
					{
						top: `${end.leaf_y}px`,
						left: `${end.leaf_x}px`,
					}
				], 2000);

				leaf_index += 1;
			}
		}
	}

	// useEffect(() => {
	// 	let interval_handle: any =  setInterval(animate, 32);

	// 	return () => {
	// 		clearInterval(interval_handle);
	// 	}
	// });
	
	
	// Render
	if (inited === false) {
		return null;
	}

	let leafs: React.ReactNode[] = [];

	for (let r = 0; r < ring_count; r++) {

		let leaf_count = end_rings[r].leaf_count;

		for (let i = 0; i < leaf_count; i++) {

			let l = end_rings[r].leafs[i];
	
			let leaf_style: CSSProperties = {
				top: `${l.leaf_y}px`,
				left: `${l.leaf_x}px`,
				zIndex: `${l.z_index}`,
				border: `1px solid black`,
				width: `${l.size}px`,
				height: `${l.size}px`,
				transform: `rotate(${l.rotation}rad)`,
				backgroundColor: 'green',
				boxShadow: `0px 0px 5px 1px black`
			};
	
			let new_leaf = (
				<div key={leafs.length} className="leaf" style={leaf_style}>
	
				</div>
			);
	
			leafs.push(new_leaf);
		}
	}

	let leafs_style: CSSProperties = {
		width: `${size}px`,
		height: `${size}px`
	};

	return (
		<div className="leafs-wrap" style={{height: `${size}px`}}>
			<div className="leafs" style={leafs_style}
				onClick={close}
			>
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