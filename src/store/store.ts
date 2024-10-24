import { configureStore } from '@reduxjs/toolkit'
import { appReducer, fieldReducer } from './reducers';
import { gameReducer } from "./reducers/game-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    game: gameReducer,
    field: fieldReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
