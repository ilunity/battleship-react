import React from 'react';
import { FieldProps } from './Field.types';
import { FieldInnerContainer, FieldOuterContainer, FieldRow, FieldTitle } from './Field.styles';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FieldCell } from "../FieldCell";
import { PLAYER_TYPE } from "../../store/reducers/game-slice";


const FieldTypeTitle = {
  [PLAYER_TYPE.USER]: 'Ваше поле',
  [PLAYER_TYPE.ENEMY]: 'Вражеское поле',
}

export const Field: React.FC<FieldProps> = ({ fieldType }) => {
  const { fieldStatuses } = useSelector((state: RootState) => state.game[fieldType]);

  return (
    <FieldOuterContainer>
      <FieldTitle>
        { FieldTypeTitle[fieldType] }
      </FieldTitle>
      <FieldInnerContainer>
        {
          fieldStatuses.map((row, x) => (
            <FieldRow key={ x }>
              { row.map((cellType, y) => (
                <FieldCell
                  key={ y }
                  type={ cellType }
                  x={ x }
                  y={ y }
                />
              )) }
            </FieldRow>
          ))
        }
      </FieldInnerContainer>
    </FieldOuterContainer>
  );
};
