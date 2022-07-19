import React from "react";

import Accordion, { Item } from '../Components/Accordion/Accordion';


function AccordionPage() {
	return <>
		<div style={{
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<div style={{flexBasis: '500px'}}>
				<Accordion>
					<Item name='Foo content 1'>
						<p>Foo 1</p>
					</Item>
					<Item name='Foo content 2'>
						<p>Foo 2</p>
					</Item>
					<Item name='Foo content 3'>
						<p>Foo 3</p>
					</Item>
				</Accordion>
			</div>
		</div>
	</>;
}

export default AccordionPage;