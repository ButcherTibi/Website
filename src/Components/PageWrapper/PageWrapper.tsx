import React, {  } from "react";


interface PageWrapperProps {
	children: JSX.Element;
}

function PageWrapper(props: PageWrapperProps)
{
	return <>
		<div className="page-wrapper">
			<header>

			</header>

			{props.children}

			<footer>
				
			</footer>
		</div>
	</>
}

export default PageWrapper;