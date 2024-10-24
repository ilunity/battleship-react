import React, { MouseEventHandler } from 'react';
import { ShipDragReturnProps, ShipDragSourceProps, ShipProps } from './Ship.types';
import { StyledShip } from './Ship.styles.ts';
import { useDispatch } from 'react-redux';
import { rotateShip, useValidateShipRotate, ValidateShipRotateOptions } from '../../store/reducers/game-slice';
import { useDrag } from 'react-dnd';


export const Ship: React.FC<ShipProps> = (
  {
    unplaced = false,
    shipState: { direction, ...ship },
    index,
    fieldType,
    draggable = false,
  },
) => {
  const validateShipRotate = useValidateShipRotate();
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag<ShipDragSourceProps, unknown, ShipDragReturnProps>(() => ({
    type: 'ship',
    canDrag: () => draggable,
    item: {
      index,
      unplaced,
      size: unplaced ? ship.size : undefined,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [draggable, ship]);

  const handleRightClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (!draggable || unplaced) {
      return;
    }

    handleRotateShip({
      shipIndex: index as number,
      field: fieldType,
    });
  };

  const handleRotateShip = (rotateOptions: ValidateShipRotateOptions) => {
    if (!validateShipRotate(rotateOptions)) {
      return;
    }

    dispatch(rotateShip(rotateOptions));
  };

  return (
    <StyledShip
      ref={ drag }
      direction={ direction }
      onContextMenu={ handleRightClick }
      { ...ship }
      draggable={ draggable }
      isDragging={ isDragging }
    />
  );
};
