import React, { MouseEvent } from "react";

import './CardList.scss';


export interface CardData {
	// date: Date;
	title: string;
	// description: string;
	// author: string;
}

export interface CardListProps {
	items: CardData[];
}

function CardList(props: CardListProps)
{
	const card_gap = 75;

	const shiftCards = (card: Element) => {
		let li = card.parentElement! as HTMLLIElement;
		let ul = li.parentElement! as HTMLUListElement;
		let item_found = false;

		for (let i = 0; i < ul.children.length; i++) {
			let item = ul.children[i] as HTMLLIElement;

			if (item_found === false) {
				if (item.className === li.className) {
					item_found = true;
				}

				item.style.top = (card_gap * i).toString() + 'px';
			}
			else {
				item.style.top = (card_gap * i + 50).toString() + 'px';
			}
		}
	}

	const unshift = (e: any) => {
		let card: HTMLElement = e.target;
		let li = card.parentElement! as HTMLLIElement;
		let ul = li.parentElement! as HTMLUListElement;

		for (let i = 0; i < ul.children.length; i++) {
			let item = ul.children[i] as HTMLLIElement;
			item.style.top = (card_gap * i).toString() + 'px'
		}
	}

	const shiftItem = (e: MouseEvent) => {
		if (e.currentTarget.classList[0] === 'item') {		
			shiftCards(e.currentTarget.children[0]);
		}
	}

	const shiftCard = (e: MouseEvent) => {
		if (e.currentTarget.classList[0] === 'card') {
			shiftCards(e.currentTarget);
		}
	}

	return (
		<ul className='card-list' onMouseLeave={unshift}>
			{props.items.map((item, idx) => {

				let style: React.CSSProperties = {
					top: (card_gap * idx).toString() + 'px',
					zIndex: (idx).toString()
				};

				return (
					<li key={idx} className={`item item-${idx}`} style={style}
						onMouseEnter={shiftItem}>
						<div className="card" onMouseEnter={shiftCard}>
							<h3>{item.title}</h3>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default CardList;