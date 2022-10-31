import { useDispatch } from 'react-redux'
import { 
	configureStore, 
	createSlice, PayloadAction
} from '@reduxjs/toolkit'


enum CounterState {
	loading,
	ready,
	error
}

export class SliceState {
	counter_state = CounterState.loading
	counter = 0
}

export class SetActionPayload {
	new_counter: number = 0
}

const main_slice = createSlice({
	name: 'main_slice',
	initialState: new SliceState(),
	reducers: {
		setCounterState(state, action: PayloadAction<{ new_counter_state: CounterState }>) {
			return {
				...state,
				counter_state: action.payload.new_counter_state
			}
		},
		setCounter(state, action: PayloadAction<SetActionPayload>) {
			return {
				...state,
				counter: action.payload.new_counter
			}
		},
		add(state) {
			return {
				...state,
				counter: state.counter + 1
			}
		},
		sub(state) { 
			return {
				...state,
				counter: state.counter - 1
			}
		},
		custom(state, action: PayloadAction<{ amount: number }>) {
			return {
				...state,
				counter: state.counter + action.payload.amount
			}
		}
	}
})

export const main_actions = main_slice.actions

export const retrieveCounter = () => {
	return async (dispatch: any) => {
		dispatch(main_actions.setCounterState({ new_counter_state: CounterState.loading }))

		let new_counter = await new Promise<number>((res) => {
			setTimeout(() => res(100), 1000)
		})
		dispatch(main_actions.setCounter({ new_counter: new_counter }))
		dispatch(main_actions.setCounterState({ new_counter_state: CounterState.ready }))
	}
}

export const store = configureStore({
	reducer: main_slice.reducer
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch