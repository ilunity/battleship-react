import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppSliceState, SCREEN_TYPE } from './app-slice.types.ts';

const initialState: AppSliceState = {
  currentScreen: SCREEN_TYPE.START,
  username: '',
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<`${SCREEN_TYPE}`>) => {
      state.currentScreen = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  }
});

const { actions, reducer } = appSlice;
export const { setScreen, setUserName } = actions;
export { reducer as appReducer };
