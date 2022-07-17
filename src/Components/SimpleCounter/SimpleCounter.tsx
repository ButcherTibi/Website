import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from '../../App/AppStore';

import './SimpleCounter.scss';


function SimpleCounter() {
	const app_value = useSelector((state: any) => state.app.app_value);
	const dispatch = useDispatch();

	const incrementGlobal = () => {
		dispatch(increment());
	}

	const decrementGlobal = () => {
		dispatch(decrement());
	}

	return (
		<div className='simple-counter'>		
			<label>Global counter value = {app_value}</label>
			<button onClick={incrementGlobal}>Add one</button>
			<button onClick={decrementGlobal}>Sub one</button>
		</div>
	);
}

export default SimpleCounter;