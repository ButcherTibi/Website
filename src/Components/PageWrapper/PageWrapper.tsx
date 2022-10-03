import React from "react";

import Header from '../Header/Header';
import Footer from "../Footer/Footer";

import './PageWrapper.scss';


interface PageWrapperProps {
	children: JSX.Element;
}

function PageWrapper(props: PageWrapperProps)
{
	return <>
		<div className="page">
			<Header />

			{props.children}

			<Footer />
		</div>
	</>
}

export default PageWrapper;