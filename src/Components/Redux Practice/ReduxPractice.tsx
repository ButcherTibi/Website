import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
	useAppDispatch,
	SliceState,
	main_actions,
	retrieveCounter
} from '../../Store/Store'

import './ReduxPractice.scss'


// class SendData {
// 	data = 'send'
// }

const sendData = async (new_counter: number) => {
	return new Promise<number>((res, rej) => {
		setTimeout(() => {
			res(new_counter)
		}, 1000)
	})
}


export const ReduxPractice = () => {
	const counter = useSelector((state: SliceState) => state.counter)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(retrieveCounter())
	}, [dispatch])

	useEffect(() => {
		const async_wrap = async () => {
			console.log('send counter = %d', await sendData(counter))
		}
		async_wrap()
	}, [counter])

	return (
		<main className='redux-practice'>
			<p>App value = {counter}</p>
			<button onClick={() => dispatch(main_actions.add())}>
				Add
			</button>
			<button onClick={() => dispatch(main_actions.sub())}>
				Sub
			</button>
			<button onClick={() => dispatch(main_actions.custom({ amount: 5 }))}>
				Custom
			</button>
		</main>
	)
}