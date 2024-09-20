import React, { MouseEventHandler } from 'react';
import { ShipProps } from './Ship.types';
import { StyledShip } from './Ship.styles.ts';
import { useDispatch } from 'react-redux';
import { rotateShip } from '../../store/reducers/game-slice';


export const Ship: React.FC<ShipProps> = ({ shipState: { position, ...ship }, index, fieldType, fixed = false }) => {
  const dispatch = useDispatch();

  const handleRightClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    dispatch(rotateShip({ index, field: fieldType }));
  };

  return (
    <StyledShip
      shipPosition={ position }
      onContextMenu={ handleRightClick }
      { ...ship }
      fixedShipPosition={ fixed }
    />
  );
};
