import React, { CSSProperties, useEffect, useState } from "react"
import { factory, JsxAttribute, JsxElement } from "typescript"

import { GiSmartphone } from 'react-icons/gi'
import { AiOutlineMail } from 'react-icons/ai'

import Rain from '../../Components/Rain/Rain'
import Ripple from "../../Components/Ripple/Ripple"
import Timeline, { Item as TimelineItem} from "../../Components/Timeline/Timeline"

import portret from '../../Resources/Me.jpeg'
// import portret2 from '../../Resources/bigger_me.jpg'
import ats_logo from '../../Resources/ats_logo.png'
import ats_office from '../../Resources/not_ats_office.jpg'
import tomtom_logo from '../../Resources/tomtom_logo.png'
import infrared_map from '../../Resources/infrared_map.jpg'

import './FrontPage.scss'


function FrontPage()
{
	return <>
		<div className="front-page">
			<main className="content-wrap">
				<Rain
					z_index={1}
					drop_color="hsl(202, 69%, 50%, 0.8)"
					drop_count={100}
					layer_angle={15}

					drop_max_delay={700}
					drop_duration_min={700}
					drop_duration_max={1500}

					drop_x_deviation_min={0}
					drop_x_deviation_max={5}

					drop_thickness_min={3}
					drop_thickness_max={4}
					drop_height_min={10}
					drop_height_max={50}
				/>

				<Ripple
					z_index={2}
					color='hsl(202, 69%, 50%)'
					duration={2000}
				/>

				<div className="content">
					<div className="left">
						<div className="intro">
							<h1 className="fullname">Măcelaru Tiberiu</h1>
							<h1 className="profesion">Front-end Developer</h1>
							<button className="about-me">Despre mine</button>
						</div>					
					</div>
					
					<div className="right">
						<img src={portret} />
						<div></div>
					</div>
				</div>

			</main>

			<section className="about-me content-wrap">
				<div className="content">
					<div className="title">
						<h3>Despre mine</h3>
					</div>
					<div>
						<p>Lucrez ca programator full-stack la Advanced Technology Systems dar aș dori să mă specializez pe backend sau pe frontend.</p>
					</div>
				</div>
			</section>

			<section className="experience content-wrap">
				<div className="content">
					<div className="title">
						<h3>Experiență</h3>
					</div>
					<div className="exp">
						<Timeline>
							<TimelineItem
								company="Advanced Technology Systems"
								start_date={new Date(2020, 7)}
								logo={ats_logo}
								background={ats_office}
							/>
							<TimelineItem
								company="Bloom Data Solutions"
								start_date={new Date(2019, 3)}
								end_date={new Date(2020, 3)}
								logo={tomtom_logo}
								background={infrared_map}
							/>
						</Timeline>
					</div>
				</div>
			</section>

			<footer>
				
			</footer>
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