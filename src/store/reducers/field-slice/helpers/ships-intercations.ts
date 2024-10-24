import {
  AddShipPayload, ClearLocationPayload,
  FieldSliceState,
  MoveShipPayload, PLAYER_TYPE, RandomLocationPayload, RemoveShipPayload, RotateShipPayload,
  Ship,
  SHIP_DIRECTION, SHIP_STATUS, ShipPosition,
} from '../field-slice.types.ts';
import { validateCells } from './ships-validation.ts';

export type ShipsHelperFunction<T, R> = (state: FieldSliceState, payload: T) => R;

export const addShip: ShipsHelperFunction<AddShipPayload, void> = (state, { fieldType, id, position }) => {
  const ship = state[fieldType].ships[id];
  const cells = state[fieldType].cells;

  ship.position = position;

  const borderedCells = getBorderedCells(ship);
  for (const { x, y } of borderedCells) {
    const cell = cells[x][y];
    cell.borderCells++;
  }

  const shipCells = getShipCells(ship);
  for (const { x, y } of shipCells) {
    const cell = cells[x][y];
    cell.shipId = ship.id;
  }

  ship.unplaced = false;
};

export const removeShipHelper: ShipsHelperFunction<RemoveShipPayload, void> = (state, { fieldType, id }) => {
  const ship = state[fieldType].ships[id];
  const cells = state[fieldType].cells;

  if (ship.unplaced) {
    return;
  }

  const borderedCells = getBorderedCells(ship);
  for (const { x, y } of borderedCells) {
    const cell = cells[x][y];
    cell.borderCells--;
  }

  const shipCells = getShipCells(ship);
  for (const { x, y } of shipCells) {
    const cell = cells[x][y];
    cell.shipId = null;
  }

  ship.unplaced = true;
  ship.position = {
    x: -10,
    y: -10,
    direction: SHIP_DIRECTION.HORIZONTAL,
  };
  ship.status = SHIP_STATUS.UNDAMAGED;
};

export const moveShipHelper: ShipsHelperFunction<MoveShipPayload, void> = (state, payload) => {
  removeShipHelper(state, payload);
  addShip(state, payload);
};

export const rotateShipHelper: ShipsHelperFunction<RotateShipPayload, void> = (state, payload) => {
  const { fieldType, id } = payload;
  const ship = state[fieldType].ships[id];
  if (ship.unplaced) {
    return;
  }

  const newDirection = ship.position.direction === SHIP_DIRECTION.VERTICAL
    ? SHIP_DIRECTION.HORIZONTAL
    : SHIP_DIRECTION.VERTICAL;

  removeShipHelper(state, payload);
  addShip(state, {
    ...payload,
    position: {
      ...ship.position,
      direction: newDirection,
    },
  });
};

export const randomLocationHelper: ShipsHelperFunction<RandomLocationPayload, void> = (state, { fieldType }) => {
  const ships = state[fieldType].ships;

  for (const ship of Object.values(ships)) {
    const newPosition = getNewShipPosition(state, { fieldType, ship });

    addShip(state, {
      fieldType,
      id: ship.id,
      position: newPosition,
    });
  }
};

export interface GetNewShipPositionOptions {
  fieldType: PLAYER_TYPE;
  ship: Ship;
}

export const getNewShipPosition: ShipsHelperFunction<GetNewShipPositionOptions, ShipPosition> = (state, {
  ship,
  fieldType,
}) => {
  let maxX, maxY;
  let x: number, y: number;
  let direction: SHIP_DIRECTION;

  const size = ship.size;
  while (true) {
    direction = Math.round(Math.random()) === 1 ? SHIP_DIRECTION.HORIZONTAL : SHIP_DIRECTION.VERTICAL;

    if (direction === SHIP_DIRECTION.VERTICAL) {
      maxX = 9;
      maxY = 10 - size;
    } else {
      maxY = 9;
      maxX = 10 - size;
    }

    x = Math.floor(Math.random() * maxX);
    y = Math.floor(Math.random() * maxY);

    const position = {
      x, y, direction,
    };

    const validationResult = validateCells(state, {
      fieldType,
      id: ship.id,
      position,
    });

    if (validationResult) {
      return position;
    }
  }
};

export const clearFieldHelper: ShipsHelperFunction<ClearLocationPayload, void> = (state, { fieldType }) => {
  const ships = state[fieldType].ships;

  for (const ship of Object.values(ships)) {
    removeShipHelper(state, { fieldType, id: ship.id });
  }
};

type GetShipCellsOptions = Pick<Ship, 'position' | 'size'>;

export const getShipCells = ({ position, size }: GetShipCellsOptions) => {
  const shipCells = [];

  const xLimit = (position.direction === SHIP_DIRECTION.HORIZONTAL
    ? position.x + size - 1
    : position.x) + 1;

  const yLimit = (position.direction === SHIP_DIRECTION.VERTICAL
    ? position.y + size - 1
    : position.y) + 1;


  for (let xi = position.x; xi < xLimit; xi++) {
    for (let yi = position.y; yi < yLimit; yi++) {
      shipCells.push({ x: xi, y: yi });
    }
  }

  return shipCells;
};

export const getBorderedCells = (ship: Ship) => {
  const borderedCells = [];
  const position = ship.position;
  if (!position) {
    return [];
  }

  const xLimit = (position.direction === SHIP_DIRECTION.HORIZONTAL
    ? position.x + ship.size - 1
    : position.x) + 2;

  const yLimit = (position.direction === SHIP_DIRECTION.VERTICAL
    ? position.y + ship.size - 1
    : position.y) + 2;

  const shipCells = getShipCells(ship);

  for (let xi = position.x - 1; xi < xLimit; xi++) {
    for (let yi = position.y - 1; yi < yLimit; yi++) {

      const isShipItself = !!shipCells.find(({ x, y }) => xi === x && yi === y);
      if (isShipItself) {
        continue;
      }

      const cellKey = `${xi}${yi}`;
      const isCellInsideField = cellKey.length === 2;
      if (!isCellInsideField) {
        continue;
      }

      borderedCells.push({ x: xi, y: yi });
    }
  }

  return borderedCells;
};
