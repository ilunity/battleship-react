/// <reference types="vite-plugin-svgr/client" />
import React, { ReactNode } from 'react';
import { FieldCellProps } from './FieldCell.types';
import { CellWrapper, HitIconWrapper, MissIconWrapper } from './FieldCell.styles.ts';
import MissIcon from '../../assets/game/miss.svg?react';
import HitIcon from '../../assets/game/hit.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ShipDragSourceProps } from '../Ship';
import {
  AddShipPayload,
  arrangeShip,
  CELL_STATUS,
  makeShot,
  moveShip,
  PLAYER_TYPE,
  useValidateCells,
} from '../../store/reducers/field-slice';
import { RootState } from '../../store';


const cellTypeContentMap: Record<CELL_STATUS, ReactNode> = {
  [CELL_STATUS.NONE]: <></>,
  [CELL_STATUS.MISS]: (
    <MissIconWrapper>
      <MissIcon />
    </MissIconWrapper>
  ),
  [CELL_STATUS.HIT]: (
    <HitIconWrapper>
      <HitIcon />
    </HitIconWrapper>
  ),
};

export const FieldCell: React.FC<FieldCellProps> = (
  {
    x,
    y,
    cellType,
    fieldType,
  },
) => {
  const validateCells = useValidateCells();
  const ships = useSelector((state: RootState) => state.field[PLAYER_TYPE.USER].ships);
  const moveTurn = useSelector((state: RootState) => state.field.moveTurn);
  const dispatch = useDispatch();

  const handleShipDrop = ({ id, unplaced }: ShipDragSourceProps) => {
    const shipDirection = ships[id].position.direction;

    const position = {
      x, y, direction: shipDirection,
    };

    const addShipOptions: AddShipPayload = {
      fieldType: PLAYER_TYPE.USER,
      id,
      position,
    };

    if (unplaced) {
      dispatch(arrangeShip(addShipOptions));
    } else {
      dispatch(moveShip(addShipOptions));
    }
  };

  const validateDrop = ({ id }: ShipDragSourceProps) => {
    const shipDirection = ships[id].position.direction;

    const position = {
      x, y, direction: shipDirection,
    };

    return validateCells({
      fieldType: PLAYER_TYPE.USER,
      id,
      position,
    });
  };

  const [, drop] = useDrop<ShipDragSourceProps>(
    () => ({
      accept: 'ship',
      drop: handleShipDrop,
      canDrop: validateDrop,
    }),
    [x, y, validateDrop],
  );

  const handleClick = () => {
    const isEnemyField = fieldType === PLAYER_TYPE.ENEMY;
    const isAlreadyShut = cellType !== CELL_STATUS.NONE;
    const isPlayerMove = moveTurn === PLAYER_TYPE.USER;
    if (!isEnemyField || isAlreadyShut || !isPlayerMove) {
      return;
    }

    dispatch(makeShot({
      fieldType: PLAYER_TYPE.ENEMY,
      x,
      y,
    }));
  };

  return (
    <CellWrapper
      ref={ drop }
      onClick={ handleClick }>
      { cellTypeContentMap[cellType] }
    </CellWrapper>
  );
};
