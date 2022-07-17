import React, { CSSProperties } from "react";

import CardList, { CardData } from "../Components/CardList/CardList";


function DemoCardList()
{
	let style: CSSProperties = {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'end'
	};

	let items: CardData[] = [];

	let titles = [
		'Quisque egestas',
		'Mauris lectus',
		'Vivamus',
		'Duis non bibendum',
		'Sed a volutpat ligula'
	];

	let descriptions = [
		'Praesent iaculis enim ut turpis rhoncus, sed aliquam eros pretium.',
		'Quisque egestas iaculis tellus id vulputate.',
		'Nulla varius nisi in augue ornare.',
		'Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
		'Donec convallis metus ut mi lacinia, sed egestas massa sollicitudin.'
	];

	let authors = [
		'Quisque',
		'Aenean',
		'Vestibulum',
		'Vivamus',
		'Curabitu'
	];

	for (let i = 0; i < 15; i++) {
		items.push({
			title: titles[i % titles.length],
			date: new Date(),
			description: descriptions[i % descriptions.length],
			author: authors[i % authors.length]
		});
	}

	return (
		<div className='demo-card-list' style={style}>
			<CardList items={items} />
		</div>
	);
}

export default DemoCardList;