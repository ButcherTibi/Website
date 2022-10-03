import React from "react";
import { useNavigate } from 'react-router-dom'

import './DemoCardList.scss'


interface CardProps {
	preview_img: string
	title: string
	to: string
	rezumat: string
}

export function Card(props: CardProps)
{
	const navigate = useNavigate()


	const goToURL = () => {
		navigate(props.to)
	}

	return (
		<div className="card" onClick={goToURL}>
			<img src={props.preview_img} alt='' />
			<div className="text">
				<h3>{props.title}</h3>
				<p>{props.rezumat}</p>
			</div>
		</div>
	)
}


interface DemoCardListProps {
	children: any
}

function DemoCardList(props: DemoCardListProps)
{
	return (
		<div className="DemoCardList">
			{props.children}
			{/* {React.Children.map(props.children, (child, index) => {
				return <>
					{React.cloneElement<CardProps>(child, {
						
					})}
				</>
			})} */}
		</div>
	)
}

export default DemoCardList