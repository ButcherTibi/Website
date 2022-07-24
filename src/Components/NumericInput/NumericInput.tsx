import React, { ChangeEvent, useEffect, useState } from "react";


interface NumericInputProps {
	value: number;
	onValueChange: (new_value: number) => void
}

function NumericInput(props: NumericInputProps)
{
	const [inited, setInited] = useState(false);
	const [display_value, setDisplayValue] = useState('');

	useEffect(() => {
		if (inited === false) {
			setDisplayValue(props.value.toString());
			setInited(true);
		}
	}, [inited]);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value_str = e.currentTarget.value;

		// debugger;
		setDisplayValue(value_str);

		let new_value = parseFloat(e.currentTarget.value);
		if (isNaN(new_value) === false) {
			props.onValueChange(new_value);
		}
	}

	return <>
		<input type={'number'} value={display_value} onChange={onChange} />
	</>;
}

export default NumericInput;