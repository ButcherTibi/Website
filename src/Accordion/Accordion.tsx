import React, { CSSProperties, useState } from 'react';

import './Accordion.scss'


export interface ItemProps {
	name: string;
	children: any;
}

export function Item(props: ItemProps)
{
	const [is_open, setIsOpen] = useState(false);
	const [scroll_height, setScrollHeight] = useState(0);

	const toggle = (e: React.MouseEvent) => {
		let li = e.currentTarget as HTMLElement;
		let content =  li.parentElement!.children[1] as HTMLDivElement;

		if (content.style.height === '0px' || content.style.height === '') {
			content.style.height = content.scrollHeight + 'px';
			setScrollHeight(content.scrollHeight);
			setIsOpen(true);
		}
		else {
			setIsOpen(false);
		}
	};

	let height: number;
	let arrow_style: CSSProperties | undefined;

	if (is_open) {
		height = scroll_height;
		arrow_style = {
			transform: 'rotate(90deg)'
		};
	}
	else {
		height = 0;
	}

	return (
		<li>
			<summary onClick={toggle}>
				<i className='arrow' style={arrow_style}>⯈</i>
				<label>{props.name}</label>
			</summary>
			<div className='content-wrap' style={{height: `${height}px`}}>
				<div className='content'>
					{props.children}
				</div>
			</div>
		</li>
	);
}

function Accordion(props: any)
{
	let children: JSX.Element[];

	if (typeof props.children.map === 'function') {
		children = props.children;
	}
	else {
		children = [ props.children ];
	}

	return <>
		<ul className='accordion'>
			{children.map((child) => {
				return (
					child
				);
			})}
		</ul>
	</>;
}

export default Accordion;