import {
  ArrangeShipPayload,
  GameSliceState,
  MoveShipPayload,
  PLAYER_TYPE,
  SHIP_DIRECTION,
  ShipState,
} from '../game-slice.types.ts';
import { validateShipArrange } from './ships-validation.ts';


export type AddShipOptions = ArrangeShipPayload;

export const addShip = (state: GameSliceState, {
  x,
  y,
  size,
  field,
  direction = SHIP_DIRECTION.HORIZONTAL,
}: AddShipOptions) => {
  const ship: ShipState = {
    x,
    y,
    size,
    direction,
  };

  addCellsWithShip(state, {
    ship,
    field,
  });
  state[field].ships.push(ship);
  state[field].unplacedShips[size] -= 1;
};


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
  return ship.direction === SHIP_DIRECTION.VERTICAL
    ? [ship.size, 1]
    : [1, ship.size];
};


export const randomLocation = (state: GameSliceState, field: `${PLAYER_TYPE}`) => {
  const { unplacedShips } = state[field];

  for (let shipSize = 4; shipSize >= 1; shipSize--) {
    while (unplacedShips[shipSize]) {
      const newShipCoord = getNewShipCoord(state, { field, shipSize });

      addShip(state, {
        ...newShipCoord,
        field,
        size: shipSize,
      });
    }
  }
};

export interface GetNewShipCoord {
  field: `${PLAYER_TYPE}`;
  shipSize: number;
}

export const getNewShipCoord = (state: GameSliceState, { shipSize, field }: GetNewShipCoord) => {
  let maxX, maxY;
  let x: number, y: number;
  let direction: SHIP_DIRECTION;

  while (true) {
    direction = Math.round(Math.random()) === 1 ? SHIP_DIRECTION.HORIZONTAL : SHIP_DIRECTION.VERTICAL;

    if (direction === SHIP_DIRECTION.HORIZONTAL) {
      maxX = 9;
      maxY = 10 - shipSize;
    } else {
      maxY = 9;
      maxX = 10 - shipSize;
    }

    x = Math.floor(Math.random() * maxX);
    y = Math.floor(Math.random() * maxY);

    const validationResult = validateShipArrange(state, {
      field,
      size: shipSize,
      x,
      y,
      direction,
    });

    if (validationResult) {
      return {
        direction,
        y,
        x,
      };
    }
  }
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
