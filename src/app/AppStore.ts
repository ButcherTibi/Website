import { configureStore, createSlice, current } from '@reduxjs/toolkit';


const appSlice = createSlice({
  name: 'app',
  initialState: { app_value: 0 },
  reducers: {
    increment: (state) => {
      return {
        ...state,
        app_value: state.app_value + 1
      }
    }
  }
});

export const { increment } = appSlice.actions;

const otherSlice = createSlice({
  name: "other",
  initialState: { other_value: 0 },
  reducers: {
    decrement: (state) => {
      return {
        ...state,
        other_value: state.other_value - 1
      }
    }
  }
});

export const { decrement } = otherSlice.actions;


export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    other: otherSlice.reducer
  }
});
