/// <reference types="vite-plugin-svgr/client" />
import React, { ReactNode } from 'react';
import { FieldCellProps } from './FieldCell.types';
import { CellWrapper, HitIconWrapper, MissIconWrapper } from './FieldCell.styles.ts';
import {
  arrangeShip,
  ArrangeShipPayload,
  FIELD_CELL_TYPE,
  moveShip,
  MoveShipPayload,
  PLAYER_TYPE,
  SHIP_DIRECTION,
  useValidateShipArrange,
  useValidateShipMove,
} from '../../store/reducers/game-slice';
import MissIcon from '../../assets/game/miss.svg?react';
import HitIcon from '../../assets/game/hit.svg?react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ShipDragSourceProps } from '../Ship';


const cellTypeContentMap: Record<`${FIELD_CELL_TYPE}`, ReactNode> = {
  [FIELD_CELL_TYPE.NONE]: <></>,
  [FIELD_CELL_TYPE.MISS]: (
    <MissIconWrapper>
      <MissIcon />
    </MissIconWrapper>
  ),
  [FIELD_CELL_TYPE.HIT]: (
    <HitIconWrapper>
      <HitIcon />
    </HitIconWrapper>
  ),
};

export const FieldCell: React.FC<FieldCellProps> = ({ x, y, type }) => {
  const validateShipMove = useValidateShipMove();
  const validateShipArrange = useValidateShipArrange();
  const dispatch = useDispatch();

  const handleShipDrop = ({ index, unplaced, size }: ShipDragSourceProps) => {
    if (unplaced) {
      return handleShipAdd(size as number);
    }

    handleShipMove({ shipIndex: index as number, xTo: x, yTo: y });
  };

  const handleShipAdd = (size: number) => {
    const arrangeShipOptions: ArrangeShipPayload = {
      field: PLAYER_TYPE.USER,
      x,
      y,
      size,
      direction: SHIP_DIRECTION.HORIZONTAL,
    };

    dispatch(arrangeShip(arrangeShipOptions));
  };

  const handleShipMove = (moveShipOptions: Omit<MoveShipPayload, 'field'>) => {
    dispatch(moveShip({
      ...moveShipOptions,
      field: PLAYER_TYPE.USER,
    }));
  };

  const validateDrop = ({ index, unplaced, size }: ShipDragSourceProps) => {
    return unplaced
      ? validateShipArrange({
        x,
        y,
        field: PLAYER_TYPE.USER,
        size: size as number,
        direction: SHIP_DIRECTION.HORIZONTAL
      })
      : validateShipMove({
        xTo: x,
        yTo: y,
        field: PLAYER_TYPE.USER,
        shipIndex: index as number,
      });
  };

  const [, drop] = useDrop<ShipDragSourceProps>(
    () => ({
      accept: 'ship',
      drop: handleShipDrop,
      canDrop: validateDrop,
    }),
    [x, y, validateShipMove],
  );

  return (
    <CellWrapper ref={ drop }>
      { cellTypeContentMap[type] }
    </CellWrapper>
  );
};
