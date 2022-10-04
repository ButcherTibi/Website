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
		setDisplayValue(props.value.toString());
	}, [props.value]);

	
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value_str = e.currentTarget.value;

		// debugger;
		setDisplayValue(value_str);

		let new_value = parseFloat(e.currentTarget.value);
		if (isNaN(new_value) === false) {
			props.onValueChange(new_value);
		}
	}


	let label: ReactNode | undefined;
	if (props.label !== undefined) {
		label = <label>{props.label}</label>
	}

	return <div className="numeric-input">
		{label}
		<input type={'number'} value={display_value} onChange={onChange} />
	</div>;
}

export default NumericInput;