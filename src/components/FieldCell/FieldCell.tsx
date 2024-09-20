/// <reference types="vite-plugin-svgr/client" />
import React, { ReactNode } from 'react';
import { FieldCellProps } from './FieldCell.types';
import { CellWrapper, HitIconWrapper, MissIconWrapper } from './FieldCell.styles.ts';
import { FIELD_CELL_TYPE } from '../../store/reducers/game-slice';
import MissIcon from '../../assets/game/miss.svg?react';
import HitIcon from '../../assets/game/hit.svg?react';


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

export const FieldCell: React.FC<FieldCellProps> = ({ type }) => {
  return (
    <CellWrapper>
      { cellTypeContentMap[type] }
    </CellWrapper>
  );
};
