import React from 'react';
import { ButtonsPanel, ShipsArrangementContainer, UnplacedShipsContainer } from './ShipsArrangement.styles.ts';
import {
  clearField,
  PLAYER_TYPE,
  randomShipLocation,
  SHIP_DIRECTION,
  ShipState,
  startGame,
} from '../../store/reducers/game-slice';
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
        direction: SHIP_DIRECTION.HORIZONTAL,
        size: +shipSize,
        x: (+shipSize - 1) * 2,
        y: i * (+shipSize + 1),
      });
    }
  });

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const ships = shipsToArrange.map((ship) => (
    <Ship
      key={ `${ship.x} + ${ship.y}` }
      fieldType={ PLAYER_TYPE.USER }
      shipState={ ship }
      draggable
      unplaced
    />
  ));

  const handleRandomLocation = () => {
    dispatch(randomShipLocation({ field: PLAYER_TYPE.USER }));
  };

  const clear = () => {
    dispatch(clearField({ field: PLAYER_TYPE.USER }));
  };

  return (
    <ShipsArrangementContainer>
      <Field
        fieldType={ PLAYER_TYPE.USER }
        draggableShips />
      <ButtonsPanel>
        <Button onClick={ handleRandomLocation }>
          Случайная расстановка
        </Button>
        <Button onClick={ clear }>
          Очистить поле
        </Button>
        { ships.length === 0 && (
          <Button onClick={ handleStartGame }>
            Начать игру
          </Button>
        ) }
      </ButtonsPanel>
      <FieldOuterContainer>
        <FieldTitle>
          Расставьте корабли:
        </FieldTitle>
        <UnplacedShipsContainer>
          { ships }
        </UnplacedShipsContainer>
      </FieldOuterContainer>
    </ShipsArrangementContainer>
  );
};
