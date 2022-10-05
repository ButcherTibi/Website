import React, { useEffect, useState } from "react"

// import { GiSmartphone } from 'react-icons/gi'
// import { AiOutlineMail } from 'react-icons/ai'

import Header from "../../Components/Header/Header"
import NewTabLink from "../../Components/NewTabLink/NewTabLink"
import Stars from "../../Components/Stars/Stars"
import SolarSystem, { DecoRingSettings, SolarSystemProps } from "../../Components/Orbit/Orbits"
import TimelinePlanets, { Item as TimelinePlanet, Props as TimelinePlanetsProps} from "../../Components/TimelinePlanets/TimelinePlanets"
import DemoCardList, { Card as DemoCard } from "../../Components/DemoCardList/DemoCardList"
import Footer from "../../Components/Footer/Footer"
import { blend, Interval, DisplayFormat } from "../../Common"

// Portret
import portret from '../../Resources/Me.jpeg'
import Leafs_preview from '../../Resources/Leafs_preview.png'

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
	const [, setMode] = useState<DisplayFormat>()


	const decideMode = () => {
		if (window.innerWidth < 700 || window.innerHeight < 700) {
			return DisplayFormat.mobile
		}
		else {
			return DisplayFormat.desktop
		}
	}

	useEffect(() => {
		const checkWindowSize = () => {
			setMode(decideMode())
		}

		checkWindowSize()
		window.addEventListener('resize', checkWindowSize)

		return () => {
			window.removeEventListener('resize', checkWindowSize)
		}
	}, [])


	// Render
	let solsys_props = new SolarSystemProps()
	let timeline_props = new TimelinePlanetsProps()

	switch (decideMode()) {
		case DisplayFormat.desktop: {
			// console.log('desktop')

			// Solar System Props
			solsys_props.sun_diameter = 100
			solsys_props.sun_name_size = 22
			solsys_props.sun_name_spacing = 40
			solsys_props.corona_diameter = 150

			solsys_props.solar_system_diameter = 600

			solsys_props.planet_diameter = 75
			solsys_props.planet_name_size = 16;
			solsys_props.planet_name_spacing = 10

			solsys_props.moon_diameter = 50

			let deco_rings: DecoRingSettings[] = Array(4)
			for (let i = 0; i < deco_rings.length; i++) {

				const alpha = i / (deco_rings.length - 1)

				deco_rings[i] = {
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

			solsys_props.deco_rings = deco_rings

			// Timeline Props
			timeline_props.planet_diameter = 300
			timeline_props.core_diameter = 150

			timeline_props.spiral_diameter = 400
			timeline_props.spiral_border_thickness = 4
			break
		}

		case DisplayFormat.mobile: {
			// console.log('mobile')

			// Solar System Props
			solsys_props.sun_diameter = 65
			solsys_props.sun_name_size = 16
			solsys_props.corona_diameter = 100
			solsys_props.sun_name_spacing = 25

			solsys_props.solar_system_diameter = 300

			solsys_props.planet_diameter = 50
			solsys_props.planet_name_size = 14
			solsys_props.planet_name_spacing = 5

			solsys_props.moon_diameter = 50

			let deco_rings: DecoRingSettings[] = Array(4)
			for (let i = 0; i < deco_rings.length; i++) {

				const alpha = i / (deco_rings.length - 1)

				deco_rings[i] = {
					diameter: 500,
					thickness: 2,
					offset_from_center: 50,
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

			solsys_props.deco_rings = deco_rings

			// Timeline Props
			timeline_props.planet_diameter = 250
			timeline_props.core_diameter = 125

			timeline_props.spiral_diameter = 400
			timeline_props.spiral_border_thickness = 4

			timeline_props.use_column_layout = true
			break;
		}
	}

	return <>
		<div className="front-page page">
			<Header />
			
			<section className="new-skills">
				<Stars
					count={100}
					scale={new Interval(0.1, 0.4)}
					opacity={new Interval(0.2, 1)}
					glow_duration_ms={new Interval(3000, 6000)}
				/>
				<SolarSystem
					{...solsys_props}
					
					sun_icon={portret}
					sun_name='Măcelaru Tiberiu'

					planets={[
						{ name: "TypeScript", icon: typescript_icon, moons: [ 
							{ text: 'Description 1', icon: typescript_icon}, 
							{ text: 'Description 2'},
							{ text: 'Description 3'}]
						},
						{ name: "JavaScript", icon: javascript_icon },
						{ name: "React", icon: react_icon },
						{ name: "HTML", icon: html_icon },
						{ name: "CSS", icon: css_icon },
						{ name: "C# Web API", icon: csharp_icon },
						{ name: "Entity Framework", icon: ef_core_icon },
					]}

					z_index={1}
					class_name={'solar-system'}
				/>
			</section>

			<section className="experience-title content-wrap">
				<div className="content">
					<h3>Experiență</h3>
				</div>
			</section>

			<section className="experience content-wrap">
				<div className="content">			
					<TimelinePlanets
						{...timeline_props}

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
			</section>

			<section className="demos-title content-wrap">
				<div className="content">
					<h3>Demonstrații</h3>
				</div>
			</section>

			<section className="demo-list content-wrap">
				<div className="content">
					<DemoCardList>
						<DemoCard preview_img={Leafs_preview} title='Frunze' to="/leafs"
							rezumat="Animație de închidere/ deschidre a unui vârtej de frunze menit să aibă rol de background."
						/>
					</DemoCardList>
				</div>
			</section>

			<Footer />
		</div>
	</>
}

export default FrontPage;