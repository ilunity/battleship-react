import {
  FIELD_CELL_TYPE,
  FieldState,
  GAME_STATUS,
  GameSliceState,
  MoveShipPayload,
  PLAYER_TYPE,
  RotateShipPayload,
  SetCellPayload,
  SetScorePayload,
  SHIP_POSITION,
} from './game-slice.types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addCellsWithShip,
  moveCellsWithShip,
  moveShipsState,
  removeCellsWithShip,
  validateShipMove,
  validateShipRotate,
} from './helpers';

const initialField: FieldState = {
  fieldStatuses: new Array(10).fill(0).map(() => new Array(10).fill(FIELD_CELL_TYPE.NONE)),
  ships: [],
  cellsWithShip: {},
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
    moveShip: (state, { payload }: PayloadAction<MoveShipPayload>) => {
      if (!validateShipMove(state, payload)) {
        throw new Error('Ship move validation error');
      }

      moveCellsWithShip(state, payload);
      moveShipsState(state, payload);
    },
    rotateShip: (state, { payload }: PayloadAction<RotateShipPayload>) => {
      if (!validateShipRotate(state, payload)) {
        throw new Error('Ship rotate validation error');
      }

      removeCellsWithShip(state, payload);

      const { field, index } = payload;
      const ship = state[field].ships[index];
      state[field].ships[index].position =
        ship.position === SHIP_POSITION.HORIZONTAL
          ? SHIP_POSITION.VERTICAL
          : SHIP_POSITION.HORIZONTAL;

      addCellsWithShip(state, { ...payload, x: ship.x, y: ship.y });
    },
  },
});

const { actions, reducer } = gameSlice;
export const { setScore, incrementScore, incrementTimer, startGame, stopGame, setCell, moveShip, rotateShip } = actions;
export { reducer as gameReducer };
