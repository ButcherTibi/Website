import { configureStore, ThunkAction, Action, createStore, createReducer } from '@reduxjs/toolkit';


export class AppStore {
  some_value = 0;
}

export function appReducer(state = new AppStore(), action: { type: string }): AppStore
{
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        some_value: state.some_value + 1
      };
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: appReducer
});
