import React, { useState, useRef,
	forwardRef, useImperativeHandle
} from "react";


const Child = forwardRef((props, ref) => {
	const [state, setState] = useState({ child: 0 })

	useImperativeHandle(ref, () => state, [state])

	const increment = () => {
		setState(prev => {
			return {
				...prev,
				child: prev.child + 1
			}
		})
	}

	return <>
		<div>
			<h1>Child Component</h1>
			<p>State = {state.child}</p>
			<button onClick={increment}>Change state</button>
		</div>
	</>
})


const Parent = () => {
	const [state, setState] = useState({
		child_state: 0
	})

	const child_ref = useRef<{child: number}>(null)

	const getChildState = () => {
		setState({
			child_state: child_ref.current!.child
		})
	}

	return <>
		<div>
			<h1>Parent Component</h1>
			<p>Extracted child state = {state.child_state}</p>
			<button onClick={getChildState}>Get child state</button>
		</div>
		<Child ref={child_ref} />
	</>
}


const AccessChildState = () => {
	return <>
		<h1>Access Child State</h1>
		<Parent />
	</>
}

export default AccessChildState