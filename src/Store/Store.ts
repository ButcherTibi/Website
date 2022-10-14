import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export class SliceState {
	counter: number = 0
}

const main_slice = createSlice({
	name: 'slice_A',
	initialState: new SliceState(),
	reducers: {
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

export const slice_actions = main_slice.actions

export const store = configureStore({
	reducer: main_slice.reducer
})
