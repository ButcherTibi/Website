import React, { CSSProperties, useEffect, useState } from "react";

import './Dropdown.scss';

interface DropdownProps {
	options: string[];
}

export default function Dropdown(props: DropdownProps)
{
	let [selected, setSelected] = useState(0);
	let [open, setOpen] = useState(false);
	let [dropdown_elem, setDropdownElem] = useState<EventTarget>();

	const closeOnOutsideClick = (e: MouseEvent) => {
		if (open &&
			dropdown_elem !== undefined &&
			e.composedPath().includes(dropdown_elem) == false) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', closeOnOutsideClick);

		return () => {
			document.removeEventListener('click', closeOnOutsideClick);
		};
	});

	const selectedClick = (e: React.MouseEvent) => {
		setOpen(!open);
		setDropdownElem(e.currentTarget.parentElement as EventTarget);
	};

	let selected_style: CSSProperties | undefined;
	if (open) {
		selected_style = {
			backgroundColor: 'var(--theme_backgrd_hover_color)'
		};
	}

	return (
		<div className='dropdown'>
			<div className='selected' style={selected_style}
				onClick={selectedClick}>
				<button>{props.options[selected]}</button>
				<i className='arrow'>⯈</i>
			</div>
			{open &&
			<ul>
				{props.options.map((option, index) => {
					return (
						<li key={index} onClick={() => {
								setSelected(index);
								setOpen(false);
							}}>
							<button>{option}</button>
						</li>
					);
				})}
			</ul>
			}
		</div>
	);
}