import React, { CSSProperties, ReactNode,
	useEffect, useState, useRef
} from "react";

import { jitter } from "../../Common";

import './Leafs.scss';
import leaf_tex_1 from '../../Resources/Leaf_tex_1.jpg';
import leaf_tex_2 from '../../Resources/Leaf_tex_2.jpg';
import leaf_tex_3 from '../../Resources/Leaf_tex_3.jpg';
import leaf_tex_4 from '../../Resources/Leaf_tex_4.jpg';

import NumericInput from "../NumericInput/NumericInput";


class LeafsProps {
	ring_count?: number = 14
	ring_open_overlap?: number = -2
	ring_close_overlap?: number = 0.5
	ring_close_size?: number = 100
	ring_closed_angle_offset?: number = 0
	ring_open_angle_offset?: number = Math.PI * 0.5
	ring_angle_offset_growth?: number = Math.PI / 4

	leaf_init_size?: number = 50
	leaf_growth_factor?: number = 1.1;
	leaf_overlap?: number = 0.5
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
	const wrapper_elem = useRef<HTMLDivElement>(null)

	const initial = new LeafsProps()

	// Ring Params
	const ring_count = props.ring_count ?? initial.ring_count!;
	const ring_open_overlap = props.ring_open_overlap ?? initial.ring_open_overlap!;
	const ring_close_overlap = props.ring_close_overlap ?? initial.ring_close_overlap!
	const ring_close_size = props.ring_close_size ?? initial.ring_close_size!
	const ring_closed_angle_offset = props.ring_closed_angle_offset ?? initial.ring_closed_angle_offset!
	const ring_open_angle_offset = props.ring_open_angle_offset ?? initial.ring_open_angle_offset!
	const ring_angle_offset_growth = props.ring_angle_offset_growth ?? initial.ring_angle_offset_growth!;

	// Leaf Params
	const leaf_init_size = props.leaf_init_size ?? initial.leaf_init_size!
	const leaf_growth_factor = props.leaf_growth_factor ?? initial.leaf_growth_factor!
	const leaf_overlap = props.leaf_overlap ?? initial.leaf_overlap!

	// Internal state
	const [state, setState] = useState({
		inited: false,
		open_rings: new Array<ComputedRing>(),
		close_rings: new Array<ComputedRing>(),
		is_open: true
	})


	// REACT BUG: situație identică cu componenta Rain, dar nu vrea să se recalculeze folosind
	// dependency list.
	const recompute = () => {

		// Extrage dimensiunea
		let width: number
		let height: number
		{
			let wrapper = wrapper_elem.current!
			const rect = wrapper.getBoundingClientRect()
			width = rect.width
			height = rect.height
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
			
					// Center leaf
					leaf_x -= leaf_size / 2;
					leaf_y -= leaf_size / 2;
			
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
		}

		// Compute open leafs
		let new_open_rings: ComputedRing[] = []
		{
			let angle_offset = ring_open_angle_offset;
			let z_index = 0;
			let leaf_size = leaf_init_size;
			let ring_radius = width > height ? width : height

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
			
					// Center leaf
					leaf_x -= leaf_size / 2;
					leaf_y -= leaf_size / 2;
			
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

				new_open_rings.push(new_computed_ring);

				z_index += 1;
				leaf_size *= leaf_growth_factor;
				ring_radius += leaf_diagonal * (1 - ring_open_overlap);
				angle_offset += ring_angle_offset_growth;
			}
		}

		setState((prev) => {
			return {
				...prev,
				close_rings: new_close_rings,
				open_rings: new_open_rings
			}
		})
	}

	
	// First time animation
	useEffect(() => {
		setState(prev => {
			let new_state = { ...prev }

			if (prev.inited === false) {
				new_state.inited = true
			}
			else {
				new_state.is_open = false
			}

			return new_state
		})
	}, [state.inited])


	useEffect(() => {
		recompute()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		ring_count,
		ring_open_overlap,
		ring_close_overlap,
		ring_close_size,
		ring_closed_angle_offset,
		ring_open_angle_offset,
		ring_angle_offset_growth,

		leaf_init_size,
		leaf_growth_factor,
		leaf_overlap
	])


	const toggle = () => {
		setState(prev => {
			return {
				...prev,
				is_open: !prev.is_open
			}
		})
	}
	
	// Render
	// console.log(props)
	let leafs: ReactNode[] = [];
	let rings: ComputedRing[] = [];

	if (state.is_open) {
		rings = state.open_rings;
	}
	else {
		rings = state.close_rings;
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
		width: 1,
		height: 1
	};

	return (
		<div className="Leafs" ref={wrapper_elem}
			onClick={toggle}
		>
			<div className="leafs" style={leafs_style}>
				{leafs}
			</div>
		</div>
	);
}


enum ActionType {
	swap,
	initial_preset,
	flip_preset,
	spin_preset,
	update_editor_param
}

class State {
	editor_props: LeafsProps = new LeafsProps()
	active_props: LeafsProps = new LeafsProps()
}

class DispatchParams {
	type: ActionType = ActionType.swap
	field_name?: string
	new_value?: any
}

function reducer(state: State, action: DispatchParams) {
	let new_state = { ...state }
	
	switch (action.type) {
		case ActionType.swap: {
			new_state.active_props = { ...state.editor_props }
			break
		}
		case ActionType.initial_preset: {
			const initial = new LeafsProps()
			new_state.editor_props = { ...initial }
			new_state.active_props = { ...initial }
			break
		}
		case ActionType.flip_preset: {
			const initial = new LeafsProps()
			new_state.editor_props = { ...initial, ring_open_angle_offset: Math.PI }
			new_state.active_props = { ...initial, ring_open_angle_offset: Math.PI }
			break
		}
		case ActionType.spin_preset: {
			const initial = new LeafsProps()
			new_state.editor_props = { ...initial, ring_open_angle_offset: Math.PI * 10 }
			new_state.active_props = { ...initial, ring_open_angle_offset: Math.PI * 10 }
			break
		}
		case ActionType.update_editor_param: {
			if (action.field_name === undefined) {
				throw new Error('field_name e undefined')
			}
			(new_state.editor_props as any)[action.field_name] = action.new_value
			break
		}
		default: console.trace()
	}

	return new_state
}


function LeafsDemo()
{
	const [state, dispatch] = React.useReducer(reducer, new State())
	

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const updateEditorParam = (field_name: string, new_value: number) => {
		dispatch({
			type: ActionType.update_editor_param,
			field_name: field_name,
			new_value: new_value
		})
	}

	return <>
		{/* <React.StrictMode> */}

		<div className="leafs-container">
			<Leafs {...state.active_props} />
		</div>

		<main className="leafs-demo content-wrap">
			<div className="editor content">
				<div className="description">
					<h3>Componenta <code>Leafs</code></h3>
					<p>Crează o serie de inele concentrice de frunze. Fiecare frunză este generată randomizată pentru a avea un aspect mai natural</p>
					<p>Poți să dai click pentru a relua animația de deschidere/închidere.</p>
					<p>Aspectul se poate schimba folosind câmpurile de mai jos.</p>
				</div>

				<div className="presets" style={{gridArea: 'presets'}}>
					<h3>Presetări</h3>
					<div className="presets-list">
						<button onClick={() => dispatch({type: ActionType.initial_preset})}>
							Inițial
						</button>
						<button onClick={() => dispatch({type: ActionType.flip_preset})}>
							Flip
						</button>
						<button onClick={() => dispatch({type: ActionType.spin_preset})}>
							Spin
						</button>
					</div>
				</div>

				<div className="params ring-params">	
					<NumericInput
						label="Numărul de inele"
						value={state.editor_props.ring_count!}
						onValueChange={value => updateEditorParam('ring_count', value)}
					/>
					<NumericInput
						label="Dimensiunea inelului central"
						value={state.editor_props.ring_close_size!}
						onValueChange={value => updateEditorParam('ring_close_size', value)}
					/>
					<NumericInput
						label="Decalajul unghiului inelelor la deschidere"
						value={state.editor_props.ring_open_angle_offset!}
						onValueChange={value => updateEditorParam('ring_open_angle_offset', value)}
					/>
				</div>

				<div className="params leaf-params">
					<NumericInput
						label="Dimensiunea inițială a frunzelor"
						value={state.editor_props.leaf_init_size!}
						onValueChange={value => updateEditorParam('leaf_init_size', value)}
					/>
					<NumericInput
						label="Factorul de creștere a frunzelor"
						value={state.editor_props.leaf_growth_factor!}
						onValueChange={value => updateEditorParam('leaf_growth_factor', value)}
					/>
					<NumericInput
						label="Nivelul de suprapunere a frunzelor"
						value={state.editor_props.leaf_overlap!}
						onValueChange={value => updateEditorParam('leaf_overlap', value)}
					/>
				</div>

				<div className="btns-cell">
					<button onClick={() => dispatch(new DispatchParams())}>Aplică</button>
				</div>
			</div>
			
		</main>
		{/* </React.StrictMode> */}
	</>;
}

export default LeafsDemo;