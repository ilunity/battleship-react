import {
  CellsWithShip,
  GameSliceState,
  MoveShipPayload,
  PLAYER_TYPE,
  RotateShipPayload,
  SHIP_POSITION,
  ShipState,
} from '../game-slice.types.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store.ts';


export type AddCellsWithShipOptions = MoveShipPayload;

export const addCellsWithShip = (state: GameSliceState, {
  index,
  x,
  y,
  field,
}: AddCellsWithShipOptions) => {
  const ship = state[field].ships[index];
  const [verticalSteps, horizontalSteps] = getShipCellsSteps(ship);

  for (let i = 0; i < verticalSteps; i++) {
    for (let j = 0; j < horizontalSteps; j++) {
      const cellKey = `${x + i}${y + j}`;
      state[field].cellsWithShip[cellKey] = true;
    }
  }
};


export interface RemoveCellsWithShipOptions {
  field: `${PLAYER_TYPE}`;
  index: number;
}

export const removeCellsWithShip = (state: GameSliceState, {
  field,
  index,
}: RemoveCellsWithShipOptions) => {
  const ship = state[field].ships[index];
  const [verticalSteps, horizontalSteps] = getShipCellsSteps(ship);

  for (let i = 0; i < verticalSteps; i++) {
    for (let j = 0; j < horizontalSteps; j++) {
      const cellKey = `${ship.x + i}${ship.y + j}`;
      delete state[field].cellsWithShip[cellKey];
    }
  }
};


export type MoveCellsWithShipOptions = MoveShipPayload;

export const moveCellsWithShip = (state: GameSliceState, options: MoveCellsWithShipOptions) => {
  removeCellsWithShip(state, { field: options.field, index: options.index });
  addCellsWithShip(state, options);
};


export type MoveShipsStateOptions = MoveShipPayload;

export const moveShipsState = (state: GameSliceState, {
  index,
  x,
  y,
  field,
}: MoveShipsStateOptions) => {
  state[field].ships[index].x = x;
  state[field].ships[index].y = y;

  return state;
};


export type ValidateShipMoveOptions = MoveShipPayload;

export const validateShipMove = (state: GameSliceState, {
  x,
  y,
  index,
  field,
}: ValidateShipMoveOptions) => {
  const ship = state[field].ships[index];
  const [verticalSteps, horizontalSteps] = getShipCellsSteps(ship);
  const shipCells = getShipCells(ship);

  return validateCells({
    xFrom: x,
    yFrom: y,
    cellsWithShip: state[field].cellsWithShip,
    shipCells,
    horizontalSteps,
    verticalSteps,
  });
};

export const useValidateShipMove = () => {
  const gameSlice = useGameSliceSelector();

  return (options: ValidateShipMoveOptions) => validateShipMove(gameSlice, options);
};


export type ValidateShipRotateOptions = RotateShipPayload;

export const validateShipRotate = (state: GameSliceState, {
  field,
  index,
}: ValidateShipRotateOptions,
) => {
  const ship = state[field].ships[index];
  const [newHorizontalSteps, newVerticalSteps] = getShipCellsSteps(ship);
  const shipCells = getShipCells(ship);

  return validateCells({
    xFrom: ship.x,
    yFrom: ship.y,
    cellsWithShip: state[field].cellsWithShip,
    shipCells,
    horizontalSteps: newHorizontalSteps,
    verticalSteps: newVerticalSteps,
  });
};

export const useValidateShipRotate = () => {
  const gameSlice = useGameSliceSelector();
  return (options: ValidateShipRotateOptions) => validateShipRotate(gameSlice, options);
};


const getShipCells = (ship: ShipState) => {
  const [verticalSteps, horizontalSteps] = getShipCellsSteps(ship);

  const shipCells = [];
  for (let i = 0; i < verticalSteps; i++) {
    for (let j = 0; j < horizontalSteps; j++) {
      const cellKey = `${ship.x + i}${ship.y + j}`;
      shipCells.push(cellKey);
    }
  }

  return shipCells;
};

interface ValidateCellsOptions {
  verticalSteps: number;
  horizontalSteps: number;
  shipCells: string[];
  xFrom: number;
  yFrom: number;
  cellsWithShip: CellsWithShip;
}

const validateCells = ({
  verticalSteps,
  horizontalSteps,
  shipCells,
  xFrom,
  yFrom,
  cellsWithShip,
}: ValidateCellsOptions) => {
  for (let i = -1; i < verticalSteps + 1; i++) {
    for (let j = -1; j < horizontalSteps + 1; j++) {
      const cellKey = `${xFrom + i}${yFrom + j}`;

      const isKeyInsideField = cellKey.length === 2;
      const isShipItselfCell = shipCells.includes(cellKey);
      const isOuterShipZone = i === -1 || i === verticalSteps || j === -1 || j === horizontalSteps;

      const isOutOfIndex = !isKeyInsideField && !isOuterShipZone;
      if (isOutOfIndex) {
        return false;
      }

      if (!isKeyInsideField || isShipItselfCell) {
        continue;
      }

      const isShipInterception = cellsWithShip[cellKey];
      if (isShipInterception) {
        return false;
      }
    }
  }

  return true;
};


export const getShipCellsSteps = (ship: ShipState) => {
  return ship.position === SHIP_POSITION.VERTICAL
    ? [ship.size, 1]
    : [1, ship.size];
};


const useGameSliceSelector = () => {
  return useSelector((state: RootState) => state.game);
};


export interface CheckShipOnCellOptions {
  field: `${PLAYER_TYPE}`;
  x: number;
  y: number;
}

export const checkShipOnCell = (state: GameSliceState, {
  field,
  x,
  y,
}: CheckShipOnCellOptions) => {
  const cellKey = `${x}${y}`;
  return !!state[field].cellsWithShip[cellKey];
};
