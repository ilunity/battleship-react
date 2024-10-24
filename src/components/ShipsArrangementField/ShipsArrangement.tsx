import React from 'react';
import { ButtonsPanel, ShipsArrangementContainer, UnplacedShipsContainer } from './ShipsArrangement.styles.ts';
import { Ship } from '../Ship';
import { Field } from '../Field';
import { useDispatch, useSelector } from 'react-redux';
import { clearField, randomShipsLocation, RootState } from '../../store';
import { FieldOuterContainer, FieldTitle } from '../Field/Field.styles.ts';
import { PLAYER_TYPE, Ship as ShipState } from '../../store/reducers/field-slice';
import { GAME_STATUS, setStatus } from '../../store/reducers/game-slice';
import { Button } from '../Button';


export const ShipsArrangement: React.FC = () => {
  const dispatch = useDispatch();
  const ships = useSelector((state: RootState) => state.field[PLAYER_TYPE.USER].ships);
  const shipsToArrange: ShipState[] = Object.values(ships).filter(ship => ship.unplaced);

  const handleStartGame = () => {
    dispatch(setStatus(GAME_STATUS.STARTED));
    dispatch(randomShipsLocation({ fieldType: PLAYER_TYPE.ENEMY }));
  };

  const shipsToArrangeElements = shipsToArrange.map((ship) => {
    const [size, count] = ship.id.split(':');
    const x = (+count - 1) * (+size + 1);
    const y = (+size - 1) * 2;

    return (
      <Ship
        key={ ship.id }
        id={ ship.id }
        fieldType={ PLAYER_TYPE.USER }
        x={ x }
        y={ y }
        draggable
      />
    );
  });

  const handleRandomLocation = () => {
    dispatch(randomShipsLocation({ fieldType: PLAYER_TYPE.USER }));
  };

  const clear = () => {
    dispatch(clearField({ fieldType: PLAYER_TYPE.USER }));
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
        { shipsToArrange.length === 0 && (
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
          { shipsToArrangeElements }
        </UnplacedShipsContainer>
      </FieldOuterContainer>
    </ShipsArrangementContainer>
  );
};
