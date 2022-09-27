import React from "react"

// import { GiSmartphone } from 'react-icons/gi'
// import { AiOutlineMail } from 'react-icons/ai'

import Rain from '../../Components/Rain/Rain'
import Ripple from "../../Components/Ripple/Ripple"
import Timeline, { Item as TimelineItem} from "../../Components/Timeline/Timeline"
import TimelinePlanets, { Item as TimelinePlanet} from "../../Components/TimelinePlanets/TimelinePlanets"
import NewTabLink from "../../Components/NewTabLink/NewTabLink"
import SolarSystem, { DecoRingSettings } from "../../Components/Orbit/Orbits"
import Stars from "../../Components/Stars/Stars"
import { blend, Interval } from "../../Common"

// Portret
import portret from '../../Resources/Me.jpeg'
// import portret2 from '../../Resources/bigger_me.jpg'

// Planets
import typescript_icon from '../../Resources/icons8-typescript-96.svg'
import javascript_icon from '../../Resources/icons8-javascript-96.svg'
import react_icon from '../../Resources/icons8-react-160.png'
import html_icon from '../../Resources/icons8-html-5-96.svg'
import css_icon from '../../Resources/icons8-css3-96.svg'
import csharp_icon from '../../Resources/C_sharp.svg'
import ef_core_icon from '../../Resources/ef_core.png'

// Moons

// Timeline Icons
import ats_logo from '../../Resources/ats_logo.png'
import ats_office from '../../Resources/not_ats_office.jpg'
import tomtom_logo from '../../Resources/tomtom_logo.png'
import infrared_map from '../../Resources/infrared_map.jpg'

import './FrontPage.scss'


function FrontPage()
{
	// Render
	let deco_rings_settings: DecoRingSettings[] = Array(4)

	for (let i = 0; i < deco_rings_settings.length; i++) {

		const alpha = i / (deco_rings_settings.length - 1)

		deco_rings_settings[i] = {
			diameter: 1100,
			thickness: 2,
			offset_from_center: 150,
			revolution_duration_ms: blend(20_000, 40_000, alpha),
			start_angle: blend(0, 360, alpha),
			
			line_count: 8,
			line_length: 35,
			line_thickness: 5,
			line_spacing: 15,

			inner_circle_diameter: 1050,
			inner_circle_dash_length: 200,
			inner_circle_dash_gap: 400,
			inner_circle_thickness: 2,
			inner_circle_revolution_duration_ms: 60_000
		}
	}

	return <>
		<div className="front-page">
			{/* <main className="content-wrap">
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
						<img src={portret} alt="" />
						<div></div>
					</div>
				</div>

			</main> */}

			<section className="new-skills">
				<Stars
					count={100}
					scale={new Interval(0.1, 0.4)}
					opacity={new Interval(0.2, 1)}
					glow_duration_ms={new Interval(3000, 6000)}
				/>
				<SolarSystem
					zoom_scale={2}
					
					sun_icon={portret}
					sun_diameter={100}
					sun_name='Măcelaru Tiberiu'
					sun_name_gap={40}
					corona_diameter={150}
					
					solar_system_diameter={600}
					solar_system_spin_time={60_000}

					planet_size={75}
					planets={[
						{ title: "TypeScript", icon: typescript_icon, moons: [ 
							{ text: 'Description 1', icon: typescript_icon, icon_size: 50}, 
							{ text: 'Description 2'},
							{ text: 'Description 3'}]
						},
						{ title: "JavaScript", icon: javascript_icon },
						{ title: "React", icon: react_icon },
						{ title: "HTML", icon: html_icon },
						{ title: "CSS", icon: css_icon },
						{ title: "C# Web API", icon: csharp_icon },
						{ title: "Entity Framework", icon: ef_core_icon },
					]}

					deco_rings={deco_rings_settings}

					z_index={1}
					class_name={'solar-system'}
				/>
			</section>

			<section className="experience-title content-wrap">
				<div className="title content">
					<h3>Experiență</h3>
				</div>
			</section>

			<section className="experience content-wrap">
				<div className="content">			
					<div className="exp">
						<TimelinePlanets
							planet_diameter={300}
							core_diameter={150}

							spiral_diameter={400}
							spiral_border_thickness={4}

							background_spiral_diameter={600}
							background_border_thickness={8}
						>
							<TimelinePlanet
								company="Advanced Technology Systems"
								job="Full-stack developer"
								start_date={new Date(2020, 7)}
								end_date={new Date(2022, 8)}
								logo={ats_logo}
								background={ats_office}
								class_name='work-activity'
							>
								<div className="company-desc">
									<h3 className="subtitle">Descrierea firmei</h3>
									<p>ATS creează software pentru instituți publice care ajută la calcularea taxelor, plata salarilor, gestiunea bugetelor, facturilor, contractelor și altor tipuri de documente.</p>
								</div>

								<div className="work-desc">
									<h3 className="subtitle">Responsabilități</h3>
									<p>Eram developer Fullstack care lucra la mai multe proiecte simultan.</p>
									<ul>
										<li><p>Cream partea de Frontend la aplicați în React cu Typescript;</p></li>
										<li><p>Foloseam o librărie JavaScript <NewTabLink url="https://js.devexpress.com" >DevExtreme</NewTabLink> pentru datagriduri, inputuri de date, popups, tabele și exportare de date în Excel;</p></li>
										<li><p>Foloseam <NewTabLink url="https://axios-http.com"><code>Axios</code></NewTabLink> sau <NewTabLink url="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"><code>fetch API</code></NewTabLink> pentru requesturi către server;</p></li>
										<li><p>Cream partea de Backend ca <NewTabLink url="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing?WT.mc_id=dotnet-35129-website&view=aspnetcore-6.0">Web API</NewTabLink> scris în C#;</p></li>
										<li><p>Interfațam cu baza de date prin <NewTabLink url="https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=netcore-cli">Entity Framework</NewTabLink>;</p></li>
										<li><p>Cream baze de date pentru proiecte;</p></li>
										<li><p>Scriam queries și proceduri stocate în T-SQL;</p></li>
										<li><p>Lucram la mentenanța unui proiect ASP.NET WebForms care folosește librăria <NewTabLink url="https://www.devexpress.com">DevExpress</NewTabLink>;</p></li>
										<li><p>Lucrat cu PHP pentru a crea o tema Wordpress pentru un site;</p></li>
									</ul>
								</div>

								<div className="apps">
									<h3 className="subtitle">Aplicații</h3>
									<div className="app-list">
										<div className="app">
											<h3>Document Management</h3>
											<p>Făceam dezvoltare la o aplicație de management a documentelor dintr-o instituție publică.</p>
											<p>În cadrul aplicației se puteau defini diagrame compuse din noduri și arce, nodurile reprezentau utilizatori iar arcele dintre noduri controlau cum va parcurge un dosar de la un utilizator la altul.</p>
											<p>Fiecare dosar creat primea un număr unic de înregistrare.</p>
										</div>

										<div className="app">
											<h3>Backup App</h3>
											<p>Am lucrat la crearea unei aplicați de backup remote care rulează pe Linux, aplicația permitea programarea calendaristică a unor task-uri prin care se transfera conținutul serverului remote în serverul local unde era instalată aplicația.</p>
											<p>Transferul de fișiere de la locația de montare la locația destinație se făcea folosind comanda <a href="https://linux.die.net/man/1/rsync" target="_blank" rel="noreferrer">RSYNC</a> invocată pe un process separat. Pentru fiecare fișier transferat se mențineau mai multe versiuni.</p>
										</div>

										<div className="app">
											<h3>Autorizați de transport</h3>
											<p>Am făcut o aplicație de evidență a autorizațiilor de transport.</p>
										</div>

										<div className="app">
											<h3>WebInvest</h3>
											<p>Reasamblat o aplicație de management a investițiilor, achizițiilor și contractelor dintr-o instituție publică.</p>
										</div>
									</div>
								</div>
							</TimelinePlanet>

							<TimelinePlanet
								company="Bloom Data Solutions"
								job="Mapper / GPS Route Checker"
								start_date={new Date(2019, 3)}
								end_date={new Date(2020, 3)}
								logo={tomtom_logo}
								background={infrared_map}
								class_name='work-activity'
							>
								<div className="company-desc">
									<h3>Descrierea firmei</h3>
									<p>Firma era cunoscută ca realizând hărți și machete pentru zone geografice și clădiri.</p>
								</div>

								<div className="work-desc">
									<h3>Activitate</h3>
									
									<div className="stages">
										<div className="stage">
											<h4>Armata franceză</h4>
											<p>Pentru primele 6 luni am lucrat pentru armata franceză.</p>
											<p>Aproximativ la începutul fiecărei luni primeam o imagine capturată de un satelit în spectru de culoare uman + infraroșu și trebuia să marchez/conturez digital fiecare structură/clădire/stradă într-o zonă definită.</p>
										</div>
										
										<div className="stage">
											<h4>TomTom</h4>
											<p>Pentru ultimele 6 luni am lucrat pentru TomTom.</p>
											<p>În fiecare zi primeam un set de rute GPS și trebuia să verific dacă traseul putea fi parcurs de către o mașină. Foloseam ceva similar cu Google Street View și Google Earth pentru a realiza verificările.</p>
										</div>
									</div>
								</div>
							</TimelinePlanet>
						</TimelinePlanets>
					</div>
				</div>
			</section>

			<footer>

			</footer>
		</div>
	</>;
}

/* <div className="right">
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
</div> */

export default FrontPage;