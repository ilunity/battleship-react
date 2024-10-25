import {
  ArrangeShipPayload,
  CELL_STATUS, ClearLocationPayload,
  FieldSliceState, GAME_STATUS, MakeShotPayload,
  MoveShipPayload,
  PLAYER_TYPE,
  PlayerFieldState, RandomLocationPayload,
  RotateShipPayload, SetScorePayload, SetStatusPayload,
  Ship,
  SHIP_DIRECTION,
  SHIP_STATUS,
} from './field-slice.types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addShip, clearFieldHelper, makeShotHelper,
  moveShipHelper, randomLocationHelper,
  rotateShipHelper,
  validateCells,
  validateRotate,
} from './helpers';

const initShips = () => {
  const ships: Record<string, Ship> = {};

  for (let size = 4; size >= 1; size--) {
    for (let count = 1; count <= 5 - size; count++) {
      const id = `${size}:${count}`;

      ships[id] = {
        unplaced: true,
        position: {
          x: -10,
          y: -10,
          direction: SHIP_DIRECTION.HORIZONTAL,
        },
        status: SHIP_STATUS.UNDAMAGED,
        damage: 0,
        size,
        id,
      };
    }
  }

  return ships;
};

const initialPlayerFieldState: PlayerFieldState = {
  cells: new Array(10).fill(0).map(() => new Array(10).fill({
    shipId: null,
    status: CELL_STATUS.NONE,
    borderCells: 0,
  })),
  ships: initShips(),
};

const initialState: FieldSliceState = {
  [PLAYER_TYPE.USER]: initialPlayerFieldState,
  [PLAYER_TYPE.ENEMY]: initialPlayerFieldState,
  score: {
    [PLAYER_TYPE.USER]: 0,
    [PLAYER_TYPE.ENEMY]: 0,
  },
  time: 0,
  status: GAME_STATUS.SHIPS_ARRANGEMENT,
};

export const fieldSlice = createSlice({
  name: 'field',
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
    setStatus: (state, { payload }: PayloadAction<SetStatusPayload>) => {
      state.status = payload;
    },
    arrangeShip: (state, { payload }: PayloadAction<ArrangeShipPayload>) => {
      const validationResult = validateCells(state, payload);
      if (!validationResult) {
        throw new Error('Ship arrange validation error');
      }

      addShip(state, payload);
    },
    moveShip: (state, { payload }: PayloadAction<MoveShipPayload>) => {
      const validationResult = validateCells(state, payload);
      if (!validationResult) {
        throw new Error('Ship move validation error');
      }

      moveShipHelper(state, payload);
    },
    rotateShip: (state, { payload }: PayloadAction<RotateShipPayload>) => {
      const validationResult = validateRotate(state, payload);
      if (!validationResult) {
        throw new Error('Ship rotate validation error');
      }

      rotateShipHelper(state, payload);
    },
    randomShipsLocation: (state, { payload }: PayloadAction<RandomLocationPayload>) => {
      clearFieldHelper(state, payload);
      randomLocationHelper(state, payload);
    },
    clearField: (state, { payload }: PayloadAction<ClearLocationPayload>) => {
      clearFieldHelper(state, payload);
    },
    makeShot: (state, { payload }: PayloadAction<MakeShotPayload>) => {
      makeShotHelper(state, payload);
    },
  },
});

const { actions, reducer } = fieldSlice;
export const {
  setScore,
  incrementScore,
  incrementTimer,
  setStatus,
  arrangeShip,
  moveShip,
  rotateShip,
  randomShipsLocation,
  clearField,
  makeShot,
} = actions;
export { reducer as fieldReducer };
