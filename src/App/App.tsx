import React from 'react';
import { Route, Routes } from 'react-router-dom';

import FrontPage from '../Pages/FrontPage/FrontPage';

import LeafsPage from '../Components/Leafs/Leafs';
import { RainDemo } from '../Components/Rain/Rain';
import AccordionPage from '../Pages/AccordionPage';
import CardListPage from '../Pages/CardListPage';
import DropdownPage from '../Pages/DropdownPage';
import MenuPage from '../Pages/MenuPage'
import SliderPage from '../Pages/SliderPage';
import Page404 from '../Pages/404';

import PageWrapper from '../Components/PageWrapper/PageWrapper';


function App() {
  return <>
		<Routes>
			<Route path='/' element={<FrontPage />} />

			<Route path='leafs' element={<PageWrapper children={<LeafsPage />} />} />
			<Route path='rain' element={<PageWrapper children={<RainDemo />} />} />

			<Route path='Accordion' element={<AccordionPage />} />
			<Route path='CardList' element={<CardListPage />} />
			<Route path='DropDown' element={<DropdownPage />} />
			<Route path='MenuPage' element={<MenuPage />} />
			<Route path='Slider' element={<SliderPage />} />
			<Route path='*' element={<Page404 />} />
		</Routes>
	</>;
}

export default App;
