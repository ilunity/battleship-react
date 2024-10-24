import {
  ArrangeShipPayload, CellsWithShip,
  GameSliceState,
  MoveShipPayload,
  RotateShipPayload,
  SHIP_DIRECTION,
  ShipState,
} from '../game-slice.types.ts';
import { getShipCellsSteps } from './ships-interactions.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store.ts';

export type ValidateShipMoveOptions = MoveShipPayload;

export const validateShipMove = (state: GameSliceState, {
  xTo,
  yTo,
  shipIndex,
  field,
}: ValidateShipMoveOptions) => {
  const ship = state[field].ships[shipIndex];
  const shipCells = getShipCells(ship);

  const newPositionShip: ShipState = {
    ...ship,
    x: xTo,
    y: yTo,
  };

  return validateCells({
    cellsWithShip: state[field].cellsWithShip,
    shipCells,
    newPositionShip,
  });
};

export const useValidateShipMove = () => {
  const gameSlice = useGameSliceSelector();

  return (options: ValidateShipMoveOptions) => validateShipMove(gameSlice, options);
};


export type ValidateShipArrangeOptions = ArrangeShipPayload;

export const validateShipArrange = (state: GameSliceState, {
  x,
  y,
  field,
  size,
  direction,
}: ValidateShipArrangeOptions) => {
  const cellsWithShip = state[field].cellsWithShip;

  const ship: ShipState = {
    x,
    y,
    direction,
    size,
  };

  return validateCells({
    shipCells: [],
    newPositionShip: ship,
    cellsWithShip,
  });
};

export const useValidateShipArrange = () => {
  const gameSlice = useGameSliceSelector();

  return (options: ValidateShipArrangeOptions) => validateShipArrange(gameSlice, options);
};


export type ValidateShipRotateOptions = RotateShipPayload;

export const validateShipRotate = (state: GameSliceState, {
  field,
  shipIndex,
}: ValidateShipRotateOptions) => {
  const ship = state[field].ships[shipIndex];
  const shipCells = getShipCells(ship);

  const newPositionShip: ShipState = {
    ...ship,
    direction: ship.direction === SHIP_DIRECTION.HORIZONTAL
      ? SHIP_DIRECTION.VERTICAL
      : SHIP_DIRECTION.HORIZONTAL,
  };

  return validateCells({
    cellsWithShip: state[field].cellsWithShip,
    shipCells,
    newPositionShip,
  });
};

export const useValidateShipRotate = () => {
  const gameSlice = useGameSliceSelector();
  return (options: ValidateShipRotateOptions) => validateShipRotate(gameSlice, options);
};


export const getShipCells = (ship: ShipState) => {
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

export interface ValidateCellsOptions {
  shipCells: string[];
  cellsWithShip: CellsWithShip;
  newPositionShip: ShipState;
}

export const validateCells = (
  {
    shipCells,
    cellsWithShip,
    newPositionShip,
  }: ValidateCellsOptions) => {
  const [verticalSteps, horizontalSteps] = getShipCellsSteps(newPositionShip);
  const { x, y } = newPositionShip;

  for (let i = -1; i < verticalSteps + 1; i++) {
    for (let j = -1; j < horizontalSteps + 1; j++) {
      const cellKey = `${x + i}${y + j}`;

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

const useGameSliceSelector = () => {
  return useSelector((state: RootState) => state.game);
};
