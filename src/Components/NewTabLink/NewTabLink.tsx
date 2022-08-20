import React from "react";


interface NewTabLinkProps {
	url: string
	children: JSX.Element | string
}

function NewTabLink(props: NewTabLinkProps) {

	return <a href={props.url} target='_blank' rel="noreferrer">
		{props.children}
	</a>
}

export default NewTabLink