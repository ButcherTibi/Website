import React, { useState } from "react";
import './FancyComment.scss'


export const ShowFancyComment = () => {
	return <p>ShowFancyComment</p>
}


interface EditFancyComment {
	comment_in: string
	onSave: (encoded_text: string) => void
}

export const EditFancyComment = () => {
	const [text, setText] = useState('')
	const [encoded_text, f] = useState('')


	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value
		setText(value)
	}

	return <div className="EditFancyComment">
		<div className="tool-bar">
			<button>Bold</button>
			<button>Italic</button>
			<button>Underline</button>
			<button>Block Quote</button>
		</div>
		<textarea value={text} onChange={onChange} />
		<button>Save</button>
	</div>
}

export const FancyCommentDemo = () => {
	

	return <main className="comment-demo content-wrap">
		<section className="content">
			<EditFancyComment />
		</section>
	</main>
}