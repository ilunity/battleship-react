import {
  FIELD_CELL_TYPE,
  FieldState,
  GAME_STATUS,
  GameSliceState,
  PLAYER_TYPE,
  RotateShipPayload,
  SetCellPayload,
  SetScorePayload,
  SHIP_POSITION,
} from './game-slice.types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialField: FieldState = {
  fieldStatuses: new Array(10).fill(0).map(() => new Array(10).fill(FIELD_CELL_TYPE.NONE)),
  ships: [],
};

const initialState: GameSliceState = {
  score: {
    [PLAYER_TYPE.USER]: 0,
    [PLAYER_TYPE.ENEMY]: 0,
  },
  time: 0,
  status: GAME_STATUS.SHIPS_ARRANGEMENT,
  [PLAYER_TYPE.USER]: initialField,
  [PLAYER_TYPE.ENEMY]: initialField,
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
    startGame: (state) => {
      state.status = GAME_STATUS.STARTED;
    },
    stopGame: (state) => {
      state.status = GAME_STATUS.STOPPED;
    },
    setCell: (state, { payload: { fieldType, x, y, cellType } }: PayloadAction<SetCellPayload>) => {
      state[fieldType].fieldStatuses[x][y] = cellType;
    },
    rotateShip: (state, { payload: { field, index } }: PayloadAction<RotateShipPayload>) => {
      const currentPosition = state[field].ships[index].position;

      state[field].ships[index].position =
        currentPosition === SHIP_POSITION.HORIZONTAL
          ? SHIP_POSITION.VERTICAL
          : SHIP_POSITION.HORIZONTAL;
    },
  },
});

const { actions, reducer } = gameSlice;
export const { setScore, incrementScore, incrementTimer, startGame, stopGame, setCell, rotateShip } = actions;
export { reducer as gameReducer };
