import React from "react";
import { Link } from "react-router-dom";
import { AppPage, AppPages } from "../App/App"


function NotFoundPage()
{
	return <>
		<h1>404 Rută negăsită</h1>
		<h3>Pagini existente:</h3>
		<ul>
			{Object.entries(AppPages).map(([, page]: [string, AppPage]) => {
				const url = page.url
				return <li key={url}>
					<Link to={url}>{url}</Link>
				</li>
			})}
		</ul>
	</>;
};

export default NotFoundPage