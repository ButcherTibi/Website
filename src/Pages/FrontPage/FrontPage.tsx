import React, { CSSProperties, useEffect, useState } from "react";
import { factory, JsxAttribute, JsxElement } from "typescript";

import { GiSmartphone } from 'react-icons/gi'
import { AiOutlineMail } from 'react-icons/ai'


import portret from '../../Resources/Me.jpeg';
import portret2 from '../../Resources/bigger_me.jpg';
import './FrontPage.scss'


function FrontPage()
{
	return <>
		<div className="front-page">
			<main className="content-wrap">
				<div className="content">
					<div className="left">
						<div className="intro">
							<h1 className="fullname">Măcelaru Tiberiu</h1>
							<h1 className="profesion">Front-end Developer</h1>
						</div>					
					</div>
					
					<div className="right">
						<img src={portret} />
						<div></div>
					</div>
				</div>
			</main>

			<section className="content-wrap">
				<div className="content">

				</div>
			</section>
		</div>
	</>;
}

{/* <div className="right">
	<div className="title">
		<h3 className="name">Măcelaru Tiberiu</h3>
		<h3 className="profesion">Front-end developer - Târgoviște</h3>
	</div>
	
	<div className="details">					
		<div className="email row">
			<AiOutlineMail />
			<p>macelarutiberiu@gmail.com</p>
		</div>
		<div className="telefon row">
			<GiSmartphone />
			<p>0730 857 817</p>
		</div>
	</div>
</div> */}

export default FrontPage;