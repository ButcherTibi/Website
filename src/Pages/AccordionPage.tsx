import React from "react";

import Accordion, { Item } from "../Accordion/Accordion";


function AccordionPage() {
	return <>
		<div style={{margin: '5px', width: '500px'}}>
			<Accordion>
				<Item name='Foo content 1'>
					<p>Foo 1</p>
				</Item>
				<Item name='Foo content 2'>
					<p>Foo 2</p>
				</Item>
			</Accordion>
		</div>
	</>;
}

export default AccordionPage;