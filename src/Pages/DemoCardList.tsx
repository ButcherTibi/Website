import React from "react";

import CardList, { CardData } from "../CardList/CardList";

import './DemoCardList.scss';


function DemoCardList()
{
	let items: CardData[] = [];

	for (let i = 0; i < 10; i++) {
		items.push({
			title: `Card ${i}`
		})
	}

	return (
		<div className='demo-card-list'>
			<CardList items={items} />
		</div>
	);
}

export default DemoCardList;