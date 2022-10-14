import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SliceState, slice_actions } from '../../Store/Store'

import './ReduxPractice.scss'


export const ReduxPractice = () => {
	const counter = useSelector((state: SliceState) => state.counter)

	const dispatch = useDispatch() 

	return (
		<main className='redux-practice'>
			<p>App value = {counter}</p>
			<button onClick={() => dispatch(slice_actions.add())}>
				Add
			</button>
			<button onClick={() => dispatch(slice_actions.sub())}>
				Sub
			</button>
			<button onClick={() => dispatch(slice_actions.custom({ amount: 5 }))}>
				Custom
			</button>
		</main>
	)
}