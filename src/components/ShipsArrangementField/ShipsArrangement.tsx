import React from 'react';
import { ShipsArrangementContainer, UnplacedShipsContainer } from './ShipsArrangement.styles.ts';
import { PLAYER_TYPE, SHIP_POSITION, ShipState, startGame } from '../../store/reducers/game-slice';
import { Ship } from '../Ship';
import { Field } from '../Field';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FieldOuterContainer, FieldTitle } from '../Field/Field.styles.ts';
import { Button } from '../Button';


export const ShipsArrangement: React.FC = () => {
  const dispatch = useDispatch();
  const shipsToArrange: ShipState[] = [];
  const shipsCount = useSelector((state: RootState) => state.game[PLAYER_TYPE.USER].unplacedShips);

  Object.entries(shipsCount).forEach(([shipSize, count]) => {
    for (let i = 0; i < count; i++) {
      shipsToArrange.push({
        position: SHIP_POSITION.HORIZONTAL,
        size: +shipSize,
        x: (+shipSize - 1) * 2,
        y: i * (+shipSize + 1),
      });
    }
  });

  const handleStateGame = () => {
    dispatch(startGame());
  };

  const ships = shipsToArrange.map((ship) => (
    <Ship
      fieldType={ PLAYER_TYPE.USER }
      shipState={ ship }
      draggable
      unplaced
    />
  ));

  return (
    <ShipsArrangementContainer>
      <Field
        fieldType={ PLAYER_TYPE.USER }
        draggableShips />
      <FieldOuterContainer>
        <FieldTitle>
          Расставьте корабли:
        </FieldTitle>
        <UnplacedShipsContainer>
          { ships }
          { ships.length === 0 && (
            <Button onClick={ handleStateGame }>
              Начать игру
            </Button>
          ) }
        </UnplacedShipsContainer>
      </FieldOuterContainer>
    </ShipsArrangementContainer>
  );
};
