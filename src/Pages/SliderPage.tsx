import React from "react";

import Slider from '../Slider/Slider';

export default function SliderPage()
{
	return <>
		<div style={{
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<div style={{flexBasis: '500px'}}>
				<Slider />
			</div>
		</div>
		
	</>;
}