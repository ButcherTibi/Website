import React, { useState } from "react";

import "./Vector3InlineInput.scss"


export default function Vector3InlineInput()
{
	const [vec3_str, setVec3String] = useState(['0', '0', '0']);

	const addToComponent = (idx: number, amount: number) => {
		setVec3String(prev => {
			let new_state = [...prev];
			
			if (new_state[idx] === '') {
				new_state[idx] = '0';
			}
			else {
				new_state[idx] = (parseFloat(new_state[idx]) + amount).toString();
			}
			return new_state;
		})
	}

	const onXChange = (e: any) => {
		setVec3String(prev => [ e.target.value, prev[1],	prev[2] ]);
	}

	const onXBlur = () => {
		setVec3String(prev => {
			return prev[0] === '' ? [ '0', prev[1],	prev[2]	] : prev
		});
	}

	const onXAdd = () => {
		addToComponent(0, 1);
	}

	const onXSub = () => {
		addToComponent(0, -1);
	}

	const onYChange = (e: any) => {
		setVec3String(prev => [ prev[0], e.target.value, prev[2] ]);
	}

	const onYBlur = () => {
		setVec3String(prev => {
			return prev[1] === '' ? [ prev[0], '0',	prev[2]	] : prev
		});
	}

	const onYAdd = () => {
		addToComponent(1, 1);
	}

	const onYSub = () => {
		addToComponent(1, -1);
	}

	const onZChange = (e: any) => {
		setVec3String(prev => [ prev[0], prev[1], e.target.value ]);
	}

	const onZBlur = () => {
		setVec3String(prev => {
			return prev[2] === '' ? [ prev[0], prev[1], '0'	] : prev
		});
	}

	const onZAdd = () => {
		addToComponent(2, 1);
	}

	const onZSub = () => {
		addToComponent(2, -1);
	}

	return (
		<div className="vec3-input-inl">
			<div className="axis x-axis">
				<button className="sub" onClick={onXSub}>⯇</button>
				<span className="field">
					<label>X:</label>
					<input type="number" value={vec3_str[0]} step="0"
						onChange={onXChange} onBlur={onXBlur}
					/>
				</span>
				<button className="add" onClick={onXAdd}>⯈</button>
			</div>
			<div className="axis y-axis">
				<button className="sub" onClick={onYSub}>⯇</button>
				<span className="field">
					<label>Y:</label>
					<input type="number" value={vec3_str[1]} step="0"
						onChange={onYChange} onBlur={onYBlur}
					/>
				</span>
				<button className="add" onClick={onYAdd}>⯈</button>
			</div>
			<div className="axis z-axis">
				<button className="sub" onClick={onZSub}>⯇</button>
				<span className="field">
					<label>Z:</label>
					<input type="number" value={vec3_str[2]} step="0"
						onChange={onZChange} onBlur={onZBlur}
					/>
				</span>
				<button className="add" onClick={onZAdd}>⯈</button>
			</div>
		</div>
	)
}