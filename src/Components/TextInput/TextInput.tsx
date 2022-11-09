import React, { ChangeEvent } from "react";


interface TextInputProps {
	value: string
	onValueChange: (value: string) => void
}

const TextInput = (props: TextInputProps) => {

	const valueChange = (e: ChangeEvent<HTMLInputElement>) => {
		props.onValueChange(e.target.value)
	}

	return <div className="TextInput">
		<input value={props.value} onChange={valueChange} />
	</div>
}

export default TextInput