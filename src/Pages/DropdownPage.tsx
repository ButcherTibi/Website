import React from "react";

import Dropdown from "../Components/Dropdown/Dropdown";

export default function DropdownPage()
{
	let options: string[] = [
		'Option 1',
		'Option 2',
		'Option 3',
	];

	return <>
		<div style={{
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<div style={{flexBasis: '500px'}}>
				<Dropdown options={options} />
			</div>
		</div>
	</>;
}