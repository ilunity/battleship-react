import {
  AddShipPayload,
  CELL_STATUS,
  ClearLocationPayload,
  FieldSliceState,
  MakeShotPayload,
  MoveShipPayload,
  PLAYER_TYPE,
  RandomLocationPayload,
  RemoveShipPayload,
  RotateShipPayload,
  Ship,
  SHIP_DIRECTION,
  SHIP_STATUS,
  ShipPosition,
} from '../field-slice.types.ts';
import { validateCells } from './ships-validation.ts';
import { getRandomElement, getRandomNumber } from '../../../../utils';

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
  ship.damage = 0;
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

    x = getRandomNumber(0, maxX);
    y = getRandomNumber(0, maxY);

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

export const makeShotHelper: ShipsHelperFunction<MakeShotPayload, void> = (state, { fieldType, x, y }) => {
  const cell = state[fieldType].cells[x][y];
  if (!cell.shipId) {
    cell.status = CELL_STATUS.MISS;
    state.moveTurn = fieldType;
    return;
  }

  cell.status = CELL_STATUS.HIT;

  const ship = state[fieldType].ships[cell.shipId];
  ship.damage++;

  const opponent = getOpponent(fieldType);

  state.score[opponent]++;

  const isShipSunk = ship.damage === ship.size;
  ship.status = isShipSunk ? SHIP_STATUS.SUNK : SHIP_STATUS.DAMAGED;
};

export const makeComputerShotHelper: ShipsHelperFunction<void, void> = (state) => {
  const userCells = state[PLAYER_TYPE.USER].cells;

  const nextPriorityCellKey = getNextPriorityCellKey(state);
  resetCellPriority(state, nextPriorityCellKey);

  const [x, y] = nextPriorityCellKey.split(':').map(v => +v);

  makeShotHelper(state, {
    fieldType: PLAYER_TYPE.USER,
    x,
    y,
  });

  const isHit = !!userCells[x][y].shipId;
  if (!isHit) {
    return;
  }

  handleComputerHitCell(state, nextPriorityCellKey);
};

const getNextPriorityCellKey: ShipsHelperFunction<void, string> = (state) => {
  const highPriorityCells = state.computerCellsPriority.high;

  // const nextHighPriorityCell = Object.keys(highPriorityCells)?.[0];
  const nextHighPriorityCell = getRandomElement(Object.keys(highPriorityCells));
  if (nextHighPriorityCell) {
    return nextHighPriorityCell;
  }

  const lowPriorityCells = state.computerCellsPriority.low;
  const nextLowPriorityCell = getRandomElement(Object.keys(lowPriorityCells)) as string;

  return nextLowPriorityCell;
};

const resetCellPriority: ShipsHelperFunction<string, void> = (state, cellKey) => {
  const highPriorityCells = state.computerCellsPriority.high;

  if (cellKey in highPriorityCells) {
    return delete highPriorityCells[cellKey];
  }

  const lowPriorityCells = state.computerCellsPriority.low;
  if (cellKey in lowPriorityCells) {
    delete lowPriorityCells[cellKey];
  }
};

const handleComputerHitCell: ShipsHelperFunction<string, void> = (state, cellKey) => {
  const [x, y] = cellKey.split(':').map(v => +v);

  const resetCell = (cellKey: string) => resetCellPriority(state, cellKey);

  const toResetCellKeys = getToResetCellKeys(x, y);
  for (const toResetCellKey of toResetCellKeys) {
    resetCell(toResetCellKey);
  }

  const toIncreaseCellKeys = getToIncreasePriorityCellKeys(x, y);
  for (const toIncreaseCellKey of toIncreaseCellKeys) {
    increaseCellPriority(state, toIncreaseCellKey);
  }
};

const getToResetCellKeys = (x: number, y: number) => {
  return [
    `${x - 1}:${y - 1}`,
    `${x + 1}:${y - 1}`,
    `${x - 1}:${y + 1}`,
    `${x + 1}:${y + 1}`,
  ];
};

const getToIncreasePriorityCellKeys = (x: number, y: number) => {
  return [
    `${x}:${y - 1}`,
    `${x - 1}:${y}`,
    `${x + 1}:${y}`,
    `${x}:${y + 1}`,
  ];
};

const increaseCellPriority: ShipsHelperFunction<string, void> = (state, cellKey) => {
  const highPriorityCells = state.computerCellsPriority.high;

  if (cellKey in highPriorityCells) {
    return;
  }

  const lowPriorityCells = state.computerCellsPriority.low;
  if (!(cellKey in lowPriorityCells)) {
    return;
  }

  highPriorityCells[cellKey] = true;
  delete lowPriorityCells[cellKey];
};

export const getOpponent = (player: PLAYER_TYPE) => {
  return player === PLAYER_TYPE.USER
    ? PLAYER_TYPE.ENEMY
    : PLAYER_TYPE.USER;
};
