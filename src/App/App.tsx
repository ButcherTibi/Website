import React from 'react';
import { Route, Routes } from 'react-router-dom';

import FrontPage from '../Pages/FrontPage/FrontPage';

import LeafsPage from '../Components/Leafs/Leafs'
import { RainDemo } from '../Components/Rain/Rain'
import { ReduxPractice } from '../Components/Redux Practice/ReduxPractice'
import AccordionPage from '../Pages/AccordionPage';
import CardListPage from '../Pages/CardListPage';
import DropdownPage from '../Pages/DropdownPage';
import MenuPage from '../Pages/MenuPage'
// import Database from '../Components/Database/Database';
import Page404 from '../Pages/404';

import PageWrapper from '../Components/PageWrapper/PageWrapper';


export class AppPage {
	url: string = ''
	elem: JSX.Element = <></>
}

export abstract class AppPages {
	static root: AppPage = {
		url: '/',
		elem: <FrontPage />
	}
	
	static leafs: AppPage = {
		url: 'leafs',
		elem: <PageWrapper children={<LeafsPage />} />
	}
	static rain: AppPage = {
		url: 'rain',
		elem: <PageWrapper children={<RainDemo />} />
	}
	static redux_practice: AppPage = {
		url: 'redux-practice',
		elem: <PageWrapper children={<ReduxPractice />} />
	}
	

	// Other
	static accordion: AppPage = {
		url: 'accordion',
		elem: <AccordionPage />
	}
	static card_list: AppPage = {
		url: 'card-list',
		elem: <CardListPage />
	}
	static dropdown: AppPage = {
		url: 'dropdown',
		elem: <DropdownPage />
	}
	static menu_page: AppPage = {
		url: 'menu-page',
		elem: <MenuPage />
	}
	// static database: AppPage = {
	// 	url: 'database',
	// 	elem: <Database />
	// }
}


function App()
{
  return <>
		<Routes>
			{Object.entries(AppPages).map(([key, page]: [string, AppPage]) => {
				return <Route key={key} path={page.url} element={page.elem} />
			})}
			<Route path='*' element={<Page404 />} />
		</Routes>
	</>;
}

export default App;
