import { GAME_STATUS, GameSliceState, SetScorePayload, SetStatusPayload } from './game-slice.types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PLAYER_TYPE } from '../field-slice';

const initialState: GameSliceState = {
  score: {
    [PLAYER_TYPE.USER]: 0,
    [PLAYER_TYPE.ENEMY]: 0,
  },
  time: 0,
  status: GAME_STATUS.SHIPS_ARRANGEMENT,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, { payload: { player, score } }: PayloadAction<SetScorePayload>) => {
      state.score[player] = score;
    },
    incrementScore: (state, { payload: { player, score } }: PayloadAction<SetScorePayload>) => {
      state.score[player] += score;
    },
    incrementTimer: (state, action: PayloadAction<number>) => {
      state.time += action.payload;
    },
    setStatus: (state, { payload }:PayloadAction<SetStatusPayload>) => {
      state.status = payload;
    },
  },
});

const { actions, reducer } = gameSlice;
export const {
  setScore,
  incrementScore,
  incrementTimer,
  setStatus,
} = actions;
export { reducer as gameReducer };
