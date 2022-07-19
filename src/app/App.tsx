import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import FrontPage from '../FrontPage/FrontPage';
import AccordionPage from '../Pages/AccordionPage';
import CardListPage from '../Pages/CardListPage';
import DropdownPage from '../Pages/DropdownPage';
import MenuPage from '../Pages/MenuPage'
import SliderPage from '../Pages/SliderPage';
import Page404 from '../Pages/404';


function App() {
  return <>
		<Routes>
			<Route path='/' element={<FrontPage />} />
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
