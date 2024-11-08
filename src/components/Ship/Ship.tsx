import React, { MouseEventHandler } from 'react';
import { ShipDragReturnProps, ShipDragSourceProps, ShipProps } from './Ship.types';
import { StyledShip, Water } from './Ship.styles.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { RootState, rotateShip } from '../../store';
import { RotateShipPayload, SHIP_STATUS, useValidateShipRotate } from '../../store/reducers/field-slice';


export const Ship: React.FC<ShipProps> = (
  {
    id,
    fieldType,
    x,
    y,
    draggable = false,
  },
) => {
  const ship = useSelector((state: RootState) => state.field[fieldType].ships[id]);
  const unplaced = ship.unplaced;
  const sunk = ship.status === SHIP_STATUS.SUNK;
  const validateShipRotate = useValidateShipRotate();
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag<ShipDragSourceProps, unknown, ShipDragReturnProps>(() => ({
    type: 'ship',
    canDrag: () => draggable,
    item: {
      id,
      unplaced,
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
      id,
      fieldType,
    });
  };

  const handleRotateShip = (rotateOptions: RotateShipPayload) => {
    if (!validateShipRotate(rotateOptions)) {
      return;
    }

    dispatch(rotateShip(rotateOptions));
  };


  return (
    <StyledShip
      ref={ drag }
      onContextMenu={ handleRightClick }
      draggable={ draggable }
      isDragging={ isDragging }
      size={ ship.size }
      x={ x }
      y={ y }
      direction={ ship.position.direction }
    >
      { sunk && <Water /> }
    </StyledShip>
  );
};
