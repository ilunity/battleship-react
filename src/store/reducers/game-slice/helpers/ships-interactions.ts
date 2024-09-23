import { GameSliceState, MoveShipPayload, PLAYER_TYPE, SHIP_POSITION, ShipState } from '../game-slice.types.ts';


export interface AddCellsWithShipOptions {
  ship: ShipState;
  field: `${PLAYER_TYPE}`;
}

export const addCellsWithShip = (state: GameSliceState, {
  ship,
  field,
}: AddCellsWithShipOptions) => {
  const { x, y } = ship;
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
  shipIndex: number;
}

export const removeCellsWithShip = (state: GameSliceState, {
  field,
  shipIndex,
}: RemoveCellsWithShipOptions) => {
  const ship = state[field].ships[shipIndex];
  const [verticalSteps, horizontalSteps] = getShipCellsSteps(ship);

  for (let i = 0; i < verticalSteps; i++) {
    for (let j = 0; j < horizontalSteps; j++) {
      const cellKey = `${ship.x + i}${ship.y + j}`;
      delete state[field].cellsWithShip[cellKey];
    }
  }
};


export type MoveCellsWithShipOptions = MoveShipPayload;

export const moveCellsWithShip = (state: GameSliceState, { field, shipIndex, xTo, yTo }: MoveCellsWithShipOptions) => {
  const ship = state[field].ships[shipIndex];
  removeCellsWithShip(state, { field, shipIndex });

  const newPositionShip: ShipState = {
    ...ship,
    x: xTo,
    y: yTo,
  };

  addCellsWithShip(state, {
    field,
    ship: newPositionShip,
  });
};


export type MoveShipsStateOptions = MoveShipPayload;

export const moveShipsState = (state: GameSliceState, {
  shipIndex,
  xTo,
  yTo,
  field,
}: MoveShipsStateOptions) => {
  state[field].ships[shipIndex].x = xTo;
  state[field].ships[shipIndex].y = yTo;

  return state;
};


export const getShipCellsSteps = (ship: ShipState) => {
  return ship.position === SHIP_POSITION.VERTICAL
    ? [ship.size, 1]
    : [1, ship.size];
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
