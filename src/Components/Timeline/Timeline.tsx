import React, { Children, CSSProperties, useEffect, useState } from "react";

import './Timeline.scss'


function extractMonthYear(date: Date): string {
	let [month, , year] =
		Intl.DateTimeFormat("ro", { year: "numeric", month: "long" })
		.formatToParts(date)
	;

	return `${month.value[0].toUpperCase() + month.value.slice(1)} ${year.value}`
}


interface ItemProps {
	company: string
	job: string
	start_date: Date
	end_date?: Date
	logo: string
	background: string
	
	// More Details
	more_classname?: string
	// company_description?: string
	// activity?: string
	skills?: string[]
	children?: any

	// Parent
	item_index?: number
	setSelected?: (new_selected_index?: number) => void
	is_selected?: boolean
}

export function Item(props: ItemProps)
{
	const is_selected = props.is_selected ?? false;

	let start = extractMonthYear(props.start_date)
	let end = props.end_date !== undefined ? extractMonthYear(props.end_date) : 'Prezent';

	let item_style: CSSProperties | undefined;
	if (props.is_selected) {
		
	}
	else if (props.is_selected === false) {
		item_style = {
			flexGrow: '0'
		}
	}

	let more_style: CSSProperties = {
		maxHeight: is_selected ? 'initial' : '0px'
	}

	let children: any[] | null = null
	if (props.children !== undefined) {
		
		children = React.Children.map(props.children, (child) => {
			return child
		})
	}

	return (
		<div className="item"
			style={item_style}>
			<div className="intro" onClick={() => props.setSelected!(props.item_index!)}>
				<div className="background"
					style={{backgroundImage: `url(${props.background})`}}>
				</div>

				<div className="inner">
					<img className="logo" src={props.logo} alt="" />
					<div className="text">
						<h3 className="company">{props.company}</h3>
						<h3 className="job">{props.job}</h3>
						<div className="timespan">
							<time>{start}</time>
							<p className="separator">-</p>
							<time>{end}</time>
						</div>
					</div>
				</div>		
			</div>
			<div className={`more ${props.more_classname ?? ''}`} style={more_style}>
				{/* <div>
					<h3 className="company-desc">Descriere companiei</h3>
					<p>{props.company_description}</p>
				</div> */}
				{children}
			</div>
		</div>
	)
}


interface TimelineProps {
	children?: any
}

function Timeline(props: TimelineProps)
{
	const [selected, setSelected] = useState<number>();

	
	useEffect(() => {
		// TODO: click outside
	}, [])

	const setSelectedItem = (new_selected_index: number | undefined) => {
		if (new_selected_index === selected) {
			setSelected(undefined)
		}
		else {
			setSelected(new_selected_index)
		}
	}

	return (
		<div className="Timeline">
			{React.Children.map(props.children, (child, index) => {
				return <>
					{React.cloneElement<ItemProps>(child, { 
						item_index: index, 
						setSelected: setSelectedItem,
						is_selected: selected !== undefined ? index === selected : undefined
					})}
				</>;
			})}
		</div>
	)
}

export default Timeline