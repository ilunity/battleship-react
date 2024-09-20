import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from "./reducers";
import { gameReducer } from "./reducers/game-slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    game: gameReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
