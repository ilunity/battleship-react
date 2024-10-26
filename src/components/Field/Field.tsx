import React from 'react';
import { FieldProps } from './Field.types';
import { FieldInnerContainer, FieldOuterContainer, FieldRow, FieldTitle } from './Field.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Ship } from '../Ship';
import { PLAYER_TYPE, SHIP_STATUS } from '../../store/reducers/field-slice';
import { FieldCell } from '../FieldCell';


const FieldTypeTitle = {
  [PLAYER_TYPE.USER]: 'Ваше поле',
  [PLAYER_TYPE.ENEMY]: 'Вражеское поле',
};

export const Field: React.FC<FieldProps> = ({ fieldType, draggableShips = false }) => {
  const shipsMap = useSelector((state: RootState) => state.field[fieldType].ships);
  const cells = useSelector((state: RootState) => state.field[fieldType].cells);

  const fieldStatusesElements = cells.map((column, x) => (
    <FieldRow key={ x }>
      {
        column.map((cell, y) => (
          <FieldCell
            key={ y }
            cellType={ cell.status }
            fieldType={ fieldType }
            x={ x }
            y={ y }
          />
        ))
      }
    </FieldRow>
  ));

  const getShipsElements = () => {
    const ships = Object.values(shipsMap);
    const displayedShips = fieldType === PLAYER_TYPE.ENEMY
      ? ships.filter(({ status }) => status === SHIP_STATUS.SUNK)
      : ships;

    return displayedShips.map(({ id, position: { x, y } }) => {
      return (
        <Ship
          key={ id }
          id={ id }
          fieldType={ fieldType }
          draggable={ draggableShips }
          x={ x }
          y={ y }
        />
      );
    });
  };

  return (
    <FieldOuterContainer>
      <FieldTitle>
        { FieldTypeTitle[fieldType] }
      </FieldTitle>
      <FieldInnerContainer>
        { fieldStatusesElements }
        { getShipsElements() }
      </FieldInnerContainer>
    </FieldOuterContainer>
  );
};
