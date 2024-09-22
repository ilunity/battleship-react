/// <reference types="vite-plugin-svgr/client" />
import React, { ReactNode } from 'react';
import { FieldCellProps } from './FieldCell.types';
import { CellWrapper, HitIconWrapper, MissIconWrapper } from './FieldCell.styles.ts';
import {
  FIELD_CELL_TYPE,
  moveShip,
  MoveShipPayload,
  PLAYER_TYPE,
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
  const dispatch = useDispatch();

  const handleShipDrop = (moveShipOptions: Omit<MoveShipPayload, 'field'>) => {
    dispatch(moveShip({
      ...moveShipOptions,
      field: PLAYER_TYPE.USER,
    }));
  };

  const [, drop] = useDrop<ShipDragSourceProps>(
    () => ({
      accept: 'ship',
      drop: ({ index }) => handleShipDrop({ index, x, y }),
      canDrop: ({ index }) => {
        return validateShipMove({
          x,
          y,
          field: PLAYER_TYPE.USER,
          index,
        });
      },
    }),
    [x, y, validateShipMove],
  );


  return (
    <CellWrapper ref={ drop }>
      { cellTypeContentMap[type] }
    </CellWrapper>
  );
};
