import {
  FIELD_CELL_TYPE,
  FieldState,
  GameSliceState,
  PLAYER_TYPE,
  SetCellPayload,
  SetScorePayload
} from "./game-slice.types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialField: FieldState = {
  fieldStatuses: new Array(10).fill(0).map(() => new Array(10).fill(FIELD_CELL_TYPE.NONE)),
  ships: 4,
}

const initialState: GameSliceState = {
  score: {
    [PLAYER_TYPE.USER]: 0,
    [PLAYER_TYPE.ENEMY]: 0,
  },
  timer: {
    time: 0,
    status: 'started',
  },
  [PLAYER_TYPE.USER]: initialField,
  [PLAYER_TYPE.ENEMY]: initialField,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setScore: (state, { payload: { player, score } }: PayloadAction<SetScorePayload>) => {
      state.score[player] = score;
    },
    incrementTimer: (state, action: PayloadAction<number>) => {
      state.timer.time += action.payload;
    },
    startTimer: (state) => {
      state.timer.status = 'started';
    },
    stopTimer: (state) => {
      state.timer.status = 'stopped';
    },
    setCell: (state, { payload: { fieldType, x, y, cellType } }: PayloadAction<SetCellPayload>) => {
      state[fieldType].fieldStatuses[x][y] = cellType;
    }
  }
});

const { actions, reducer } = gameSlice;
export const { setScore, incrementTimer, startTimer, stopTimer, setCell } = actions;
export { reducer as gameReducer };
