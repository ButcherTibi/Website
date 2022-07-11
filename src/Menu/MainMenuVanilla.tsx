import React, { useState } from "react";

import './MainMenu.scss';


export class MainMenuItemData {
	name: string = '';
	children?: MainMenuItemData[]
}

interface MenuItemProps {
	name: string;
	children?: MainMenuItemData[]
	level: number;
}

function MenuItem(props: MenuItemProps)
{
	const [close_timer_id, setCloseTimerId] = useState<NodeJS.Timeout>();

	const _hideDescedants = (menu: HTMLElement, except: HTMLElement | null) => {
		if (menu !== except) {

			if (menu.classList.contains("hide") === false) {
				menu.classList.add("hide");
			}
			
			for (let i = 0; i < menu.children.length; i++) {

				let item = menu.children[i];
				let child_menu = item.children[1] as HTMLElement;
				if (child_menu !== undefined) {
					_hideDescedants(child_menu, except);
				}
			}
		}
	}

	const hideDescedants = (menu: HTMLElement, except: HTMLElement | null) => {
		for (let i = 0; i < menu.children.length; i++) {

			let item = menu.children[i];
			let child_menu = item.children[1] as HTMLElement;
			if (child_menu !== undefined) {
				_hideDescedants(child_menu, except);
			}
		}
	}
	
	const showMenu = (li_elem: HTMLLIElement) => {
		let ul: HTMLElement = li_elem.children[1] as HTMLElement;
		let parent_li: HTMLElement = li_elem.parentElement as HTMLElement;
		clearTimeout(close_timer_id);

		if (ul !== undefined) {
			hideDescedants(parent_li, ul);
			ul.classList.remove("hide");

			if (parent_li.classList.contains("main-menu") === false) {
				let menu_width: number = parent_li.getBoundingClientRect().width;
				ul.style.top = `-2px`;
				ul.style.left = `${menu_width - 4}px`;
			}
		}
		else {
			hideDescedants(parent_li, null);
		}
	}

	const scheduleHidingMenu = (e: React.MouseEvent) => {
		let li_elem: HTMLElement = e.currentTarget as HTMLElement;

		let menu: HTMLElement = li_elem.children[1] as HTMLElement;
		if (menu !== undefined) {

			let hideMenu = (menu: HTMLElement) => {
				if (menu.classList.contains("hide") === false) {
					menu.classList.add("hide");
				}
			};

			// Reschedule hiding the menu
			clearTimeout(close_timer_id);
			setCloseTimerId(setTimeout(hideMenu, 1000, menu))
		}
	}

	// Render
	let item_class = '';
	let showMenuOnTitleClick;
	let showMenuOnEnter;

	if (props.level === 0) {
		
		item_class = 'title-item';
		showMenuOnTitleClick = (e: React.MouseEvent) => {
			let content = e.currentTarget;
			showMenu(content.parentElement as HTMLLIElement);
		};
		showMenuOnEnter = (e: React.MouseEvent) => {
			showMenu(e.currentTarget as HTMLLIElement);
		};
	}
	else {
		item_class = 'normal-item';
		showMenuOnEnter = (e: React.MouseEvent) => {
			showMenu(e.currentTarget as HTMLLIElement);
		};
	}

	if (props.children === undefined || props.children.length === 0) {
		return (
			<li className={`menu-item ${item_class}`}
				onMouseEnter={showMenuOnEnter} onMouseLeave={scheduleHidingMenu}>
				<div className="content">
					<h3 className="name">{props.name}</h3>
				</div>
			</li>
		);
	}
	else {
		return (
			<li className={`menu-item ${item_class}`}
				onMouseEnter={showMenuOnEnter} onMouseLeave={scheduleHidingMenu}>
				<div className="content" onClick={showMenuOnTitleClick}>
					<h3 className="name">{props.name}</h3>
					{<i className="arrow">⯈</i> && props.level !== 0}
				</div>
				<ul className="hide">
					{props.children!.map((child, idx) => {
						return <>
							<MenuItem
								key={idx.toString()}
								name={child.name} children={child.children}
								level={props.level + 1}
							/>
						</>
					})}
				</ul>
			</li>
		);
	}
}

export interface MainMenuProps {
	items: MainMenuItemData[];
}

function MainMenuVanilla(props: MainMenuProps)
{
	return (
		<ul className="main-menu">
			{props.items.map((item, idx) => {
				return (
					<MenuItem key={idx.toString()}
						name={item.name} children={item.children}
						level={0}
					/>
				);
			})}
		</ul>
	);
}

export default MainMenuVanilla;