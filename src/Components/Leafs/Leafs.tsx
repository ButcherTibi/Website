import React, { CSSProperties, ReactNode, useEffect, useState } from "react";

import './Leafs.scss';
import leaf_tex_1 from '../../Resources/Leaf_tex_1.jpg';
import leaf_tex_2 from '../../Resources/Leaf_tex_2.jpg';
import leaf_tex_3 from '../../Resources/Leaf_tex_3.jpg';
import leaf_tex_4 from '../../Resources/Leaf_tex_4.jpg';

import NumericInput from "../NumericInput/NumericInput";


interface LeafsProps {
	height?: number;

	ring_count?: number;
	ring_open_overlap?: number;
	ring_close_overlap?: number;
	ring_close_size?: number;
	ring_closed_angle_offset?: number;
	ring_open_angle_offset?: number;
	ring_angle_offset_growth?: number;

	leaf_init_size?: number;
	leaf_growth_factor?: number;
	leaf_overlap?: number;
}

class LeafData {
	leaf_y: number = 0;
	leaf_x: number = 0;
	z_index: number = 0;
	size: number = 0;
	rotation: number = 0;  // radians

	scale_x: number = 1;
	scale_y: number = 1;
	side_radius_a: number = 100;
	side_radius_b: number = 50;

	background: number = 0;

	public static background_images: string[] = [
		leaf_tex_1,
		leaf_tex_2,
		leaf_tex_3,
		leaf_tex_4
	];
}

class ComputedRing {
	leaf_count: number = 0;
	leafs: LeafData[] = [];
}

export function Leafs(props: LeafsProps)
{
	// Configuration
	const size = props.height ?? 700;

	// Ring Params
	const ring_count = props.ring_count ?? 14;
	const ring_open_overlap = props.ring_open_overlap ?? -2;
	const ring_close_overlap = props.ring_close_overlap ?? 0.5;
	const ring_close_size = props.ring_close_size ?? 100;
	const ring_closed_angle_offset = props.ring_closed_angle_offset ?? 0;
	const ring_open_angle_offset = props.ring_open_angle_offset ?? Math.PI * 0.5;
	const ring_angle_offset_growth = props.ring_angle_offset_growth ?? Math.PI / 4;

	// Leaf Params
	/** Must remain the same between open and close keyframes or else
	 * bad performance */
	const leaf_init_size = props.leaf_init_size ?? 50;
	const leaf_growth_factor = props.leaf_growth_factor ?? 1.1;
	const leaf_overlap = props.leaf_overlap ?? 0.5;	

	// Internal state
	const [inited, setInited] = useState(false);
	const [open_rings, setOpenRings] = useState<ComputedRing[]>([]);
	const [close_rings, setCloseRings] = useState<ComputedRing[]>([]);
	const [is_open, setIsOpen] = useState(true);


	const recompute = () => {

		const jitter = (min: number, max: number) => {
			return min + ((max - min) * Math.random());
		}

		// Compute closed leafs
		let new_close_rings: ComputedRing[] = [];
		{		
			let angle_offset = ring_closed_angle_offset;
			let z_index = 0;
			let leaf_size = leaf_init_size;
			let ring_radius = ring_close_size;

			for (let r = 0; r < ring_count; r++) {

				let circum = Math.PI * (ring_radius * 2);
				let leaf_diagonal = Math.sqrt(Math.pow(leaf_size, 2) * 2);
				let leaf_count = Math.floor(circum / (leaf_diagonal * leaf_overlap));

				let angle_rad = angle_offset;

				let new_close_ring = new ComputedRing();
				new_close_ring.leaf_count = leaf_count;
				
				for (let i = 0; i < leaf_count; i++) {

					// Position
					let leaf_x = Math.sin(angle_rad) * ring_radius;
					let leaf_y = Math.cos(angle_rad) * ring_radius;
			
					// Normalize to top left origin
					leaf_x += size / 2 - leaf_size / 2;
					leaf_y += size / 2 - leaf_size / 2;
			
					// Rotation
					let leaf_rotation = (Math.PI / 4) - angle_rad;
					leaf_rotation += jitter(-0.1, 0.1);
			
					// Shape
					let min_scale  = 1;
					let max_scale = 1.25;
					let scale_x = jitter(min_scale, max_scale);
					let scale_y = jitter(min_scale, max_scale);
			
					let side_radius_a = jitter(80, 120);
					let side_radius_b = jitter(30, 70);

					// Background
					let background = Math.floor(jitter(0, 4));

					// Store Computation
					new_close_ring.leafs.push({
						leaf_y: leaf_y,
						leaf_x: leaf_x,
						z_index: z_index,
						size: leaf_size,
						rotation: leaf_rotation,
						scale_x: scale_x,
						scale_y: scale_y,
						side_radius_a: side_radius_a,
						side_radius_b: side_radius_b,
						background: background
					});
			
					// Advance Leaf
					angle_rad += (2 * Math.PI) / leaf_count;
				}

				new_close_rings.push(new_close_ring);

				z_index += 1;
				leaf_size *= leaf_growth_factor;
				ring_radius += leaf_diagonal * (1 - ring_close_overlap);
				angle_offset += ring_angle_offset_growth;
			}

			setCloseRings(new_close_rings);
		}

		// Compute open leafs
		{
			let new_begin_rings: ComputedRing[] = [];
			
			let angle_offset = ring_open_angle_offset;
			let z_index = 0;
			let leaf_size = leaf_init_size;
			let ring_radius = window.screen.width;

			for (let r = 0; r < ring_count; r++) {

				let leaf_diagonal = Math.sqrt(Math.pow(leaf_size, 2) * 2);
				let leaf_count = new_close_rings[r].leaf_count;

				let angle_rad = angle_offset;

				let new_computed_ring = new ComputedRing();
				new_computed_ring.leaf_count = leaf_count;
				
				for (let i = 0; i < leaf_count; i++) {

					let open_leaf = new_close_rings[r].leafs[i];

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
						rotation: leaf_rotation,

						scale_x: open_leaf.scale_x,
						scale_y: open_leaf.scale_y,
						side_radius_a: open_leaf.side_radius_a,
						side_radius_b: open_leaf.side_radius_b,
						background: open_leaf.background
					});
			
					// Advance Leaf
					angle_rad += (2 * Math.PI) / leaf_count;
				}

				new_begin_rings.push(new_computed_ring);

				z_index += 1;
				leaf_size *= leaf_growth_factor;
				ring_radius += leaf_diagonal * (1 - ring_open_overlap);
				angle_offset += ring_angle_offset_growth;
			}

			setOpenRings(new_begin_rings);
		}
	}

	// First time animation
	useEffect(() => {
		if (inited === false) {
			recompute();
			setInited(true);
		}
		else {
			setIsOpen(false);
		}
	}, [inited]);


	useEffect(() => {
	 	recompute();
	}, [props]);


	const toggle = () => {
		setIsOpen(!is_open);
	}
	
	// Render
	if (inited === false) {
		return null;
	}

	let leafs: ReactNode[] = [];
	let rings: ComputedRing[] = [];

	if (is_open) {
		rings = open_rings;
	}
	else {
		rings = close_rings;
	}

	for (let r = 0; r < rings.length; r++) {

		let leaf_count: number = rings[r].leaf_count;

		for (let i = 0; i < leaf_count; i++) {

			let l = rings[r].leafs[i];
	
			let leaf_style: CSSProperties = {
				zIndex: `${l.z_index}`,

				border: `1px solid black`,
				borderTopRightRadius: `${l.side_radius_a}% ${l.side_radius_b}%`,
				borderBottomLeftRadius: `${l.side_radius_b}% ${l.side_radius_a}%`,
				
				width: `${l.size}px`,
				height: `${l.size}px`,

				transform: `translate(${l.leaf_x}px, ${l.leaf_y}px) rotate(${l.rotation}rad) scale(${l.scale_x}, ${l.scale_y})`,

				// backgroundColor: 'green',
				boxShadow: `0px 0px 5px 1px black`
			};

			let inner_style: CSSProperties = {
				backgroundImage: `url('${LeafData.background_images[l.background]}')`,
			};

			// let key = leafs.length + (is_open ? '_open' : '_close');
	
			let new_leaf = (
				<div key={leafs.length} className="leaf" style={leaf_style}>
					<div style={inner_style}></div>
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
		<div className="leafs-wrap" style={{height: `${size}px`}} onClick={toggle}>
			<div className="leafs" style={leafs_style}>
				{leafs}
			</div>
		</div>
	);
}

function LeafsDemo()
{
	const [height, setHeight] = useState(700);
	const [ring_count, setRingCount] = useState(14);
	const [ring_close_size, setRingCloseSize] = useState(100);
	const [ring_open_angle_offset, setRingOpenAngleOffset] = useState(Math.PI * 0.5);

	const [leaf_init_size, setLeafInitSize] = useState(50);
	const [leaf_growth_factor, setLeafGrowthFactor] = useState(1.1);
	const [leaf_overlap, setLeafOverlap] = useState(0.5);

	return <>
		{/* <React.StrictMode> */}
		<main className="leafs-demo">
			<Leafs
				height={height}
				ring_count={ring_count}
				ring_close_size={ring_close_size}
				ring_open_angle_offset={ring_open_angle_offset}

				leaf_init_size={leaf_init_size}
				leaf_growth_factor={leaf_growth_factor}
			/>

			<div className="editor">
				<div className="description">
					<h3><code>Leafs</code> component</h3>
					<p>Creates a series of concentric circles of leafs. Each leaf is randomized to appear more natural.</p>
					<p>You can click on the center to replay to opening/closing animation.</p>
					<p>The aperance can be changed using the inputs below.</p>
				</div>

				<div className="params general-params">
					<NumericInput
						label="Container height"
						value={height}
						onValueChange={setHeight}
					/>
				</div>

				<div className="params ring-params">	
					<NumericInput
						label="Ring count"
						value={ring_count}
						onValueChange={setRingCount}
					/>
					<NumericInput
						label="Ring close size"
						value={ring_close_size}
						onValueChange={setRingCloseSize}
					/>
					<NumericInput
						label="Ring open angle offset"
						value={ring_open_angle_offset}
						onValueChange={setRingOpenAngleOffset}
					/>
				</div>

				<div className="params leaf-params">
					<NumericInput
						label="Leaf initial size"
						value={leaf_init_size}
						onValueChange={setLeafInitSize}
					/>
					<NumericInput
						label="Leaf growth factor"
						value={leaf_growth_factor}
						onValueChange={setLeafGrowthFactor}
					/>
					<NumericInput
						label="Leaf overlap"
						value={leaf_overlap}
						onValueChange={setLeafOverlap}
					/>
				</div>
			</div>
			
		</main>
		{/* </React.StrictMode> */}
	</>;
}

export default LeafsDemo;