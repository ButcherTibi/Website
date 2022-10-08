import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

import './NumericInput.scss'


interface NumericInputProps {
	label?: string;
	value: number;
	onValueChange: (new_value: number) => void
}

function NumericInput(props: NumericInputProps)
{
	const [display_value, setDisplayValue] = useState('');


	useEffect(() => {
		if (parseFloat(display_value) !== props.value) {
			setDisplayValue(props.value.toString())
		}
		// nu apela efectu după fiecare `setDisplayValue` că altfel
		// nu merge șters scrisu de tot.
		// Maybe display_value ca useRef cu force update ?
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value]);

	
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		let new_value_str = e.currentTarget.value;

		setDisplayValue(new_value_str);

		let new_value = parseFloat(e.currentTarget.value);
		if (isNaN(new_value) === false) {
			console.log(`new value = ${new_value}`)
			props.onValueChange(new_value);
		}
	}


	let label: ReactNode | undefined;
	if (props.label !== undefined) {
		label = <label>{props.label}</label>
	}

	return <div className="numeric-input">
		{label}
		<input type={'number'} value={display_value}
			onChange={onChange}
		/>
	</div>;
}

export default NumericInput;