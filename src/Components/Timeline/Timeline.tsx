import React, { Children } from "react";

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
	start_date: Date
	end_date?: Date
	logo: string
	background: string
	description?: string
}

export function Item(props: ItemProps) {

	let start = extractMonthYear(props.start_date)
	let end = props.end_date !== undefined ? extractMonthYear(props.end_date) : 'Prezent';

	console.log(props.background)

	return (
		<div className="item">
			<div className="intro" style={{background: `url(${props.background})`}}>
				<img className="logo" src={props.logo} />
				<div className="timespan">
					<time>{start}</time>
					<p>-</p>
					<time>{end}</time>
				</div>
				<h3>{props.company}</h3>
			</div>
			<div className="more">
				<p>Detaili complete</p>
			</div>
		</div>
	)
}


interface TimelineProps {
	children?: React.ReactElement<ItemProps>[]
}

function Timeline(props: TimelineProps) {

	// let child_count = React.Children.count(props.children);

	return (
		<div className="Timeline">
			{React.Children.map(props.children, (child) => {
				return child
			})}
		</div>
	)
}

export default Timeline