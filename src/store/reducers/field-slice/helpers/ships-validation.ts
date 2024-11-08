import { AddShipPayload, MoveShipPayload, RotateShipPayload, SHIP_DIRECTION } from '../field-slice.types.ts';
import { getBorderedCells, getShipCells, ShipsHelperFunction } from './ships-intercations.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store.ts';

export const validateRotate: ShipsHelperFunction<RotateShipPayload, boolean> = (state, payload) => {
  const { fieldType, id } = payload;
  const ship = state[fieldType].ships[id];

  const newDirection = ship.position.direction === SHIP_DIRECTION.VERTICAL
    ? SHIP_DIRECTION.HORIZONTAL
    : SHIP_DIRECTION.VERTICAL;

  return validateCells(state, {
    fieldType,
    id,
    position: {
      ...ship.position,
      direction: newDirection,
    },
  });
};

export const validateCells: ShipsHelperFunction<AddShipPayload, boolean> = (state, {
  fieldType,
  id,
  position,
}) => {
  const ship = state[fieldType].ships[id];
  const cells = state[fieldType].cells;

  const shipBorders = getBorderedCells(ship);
  const shipCells = getShipCells(ship);
  const newShipsCells = getShipCells({ position, size: ship.size });

  for (const { x, y } of newShipsCells) {
    const isShipItself = !!shipCells.find((s) => s.x === x && s.y === y);
    const isShipBorder = !!shipBorders.find((s) => s.x === x && s.y === y);
    if (isShipItself || isShipBorder) {
      continue;
    }

    const cell = cells[+x][+y];

    const isBorderCell = !!cell.borderCells;
    const isNotEmpty = !!cell.shipId;
    if (isBorderCell || isNotEmpty) {
      return false;
    }
  }

  return true;
};

export const useValidateCells = () => {
  const fieldSlice = useFieldSliceSelector();

  return (options: MoveShipPayload) => validateCells(fieldSlice, options);
};

export const useValidateShipRotate = () => {
  const fieldSlice = useFieldSliceSelector();

  return (options: RotateShipPayload) => validateRotate(fieldSlice, options);
};

const useFieldSliceSelector = () => {
  return useSelector((state: RootState) => state.field);
};