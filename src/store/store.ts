import { configureStore } from '@reduxjs/toolkit'
import { appReducer, fieldReducer } from './reducers';

export const store = configureStore({
  reducer: {
    app: appReducer,
    field: fieldReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
