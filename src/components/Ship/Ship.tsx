import React, { MouseEventHandler } from 'react';
import { ShipDragSourceProps, ShipProps } from './Ship.types';
import { StyledShip } from './Ship.styles.ts';
import { useDispatch } from 'react-redux';
import { rotateShip, useValidateShipRotate } from '../../store/reducers/game-slice';
import { useDrag } from 'react-dnd';


export const Ship: React.FC<ShipProps> = (
  {
    shipState: { position, ...ship },
    index,
    fieldType,
    draggable = false,
  },
) => {
  const validateShipRotate = useValidateShipRotate();
  const dispatch = useDispatch();
  const [, drag] = useDrag<ShipDragSourceProps>(() => ({
    type: 'ship',
    canDrag: () => draggable,
    item: { index },
  }), [draggable]);

  const handleRightClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!draggable) {
      return;
    }

    handleRotateShip();
  };

  const handleRotateShip = () => {
    const rotateOptions = {
      index,
      field: fieldType,
    };

    if (!validateShipRotate(rotateOptions)) {
      return;
    }

    dispatch(rotateShip(rotateOptions));
  };

  return (
    <StyledShip
      ref={ drag }
      shipPosition={ position }
      onContextMenu={ handleRightClick }
      { ...ship }
      draggable={ draggable }
    />
  );
};
