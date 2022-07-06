import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../app/store"
import './SimpleCounter.scss';


function SimpleCounter() {
	const [counter, setCounter] = useState(0);
	const global_counter = useSelector((state: AppStore) => state.some_value);
	const dispatch = useDispatch();


	const incrementLocal = () => {
		setCounter(prev => prev + 1);
	}

	const incrementGlobal = () => {
		dispatch({ type: 'increment' });
	}

	return (
		<div className='simple-counter'>
			<label>Local counter value = {counter}</label>
			<button onClick={incrementLocal}>Increment local counter value</button>
			
			<label>Global counter value = {global_counter}</label>
			<button onClick={incrementGlobal}>Increment global counter value</button>
		</div>
	);
}

export default SimpleCounter;