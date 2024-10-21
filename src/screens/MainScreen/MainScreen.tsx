import React from 'react';
import { FieldsContainer, MainScreenBG, MainScreenContainer, MainScreenInfo } from './MainScreen.styles.ts';
import { Timer } from '../../components/Timer';
import { Score } from '../../components/Score';
import { Field } from '../../components/Field';
import { GAME_STATUS, PLAYER_TYPE } from '../../store/reducers/game-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ShipsArrangement } from '../../components/ShipsArrangementField';


export const MainScreen: React.FC = () => {
  const gameStatus = useSelector((state: RootState) => state.game.status);
  const isShipsArrangementStatus = gameStatus === GAME_STATUS.SHIPS_ARRANGEMENT;

  return (
    <MainScreenContainer>
      <MainScreenBG />
      <MainScreenInfo>
        <Timer />
        <Score />
      </MainScreenInfo>
      <FieldsContainer>
        { isShipsArrangementStatus
          ? <ShipsArrangement />
          : (
            <>
              <Field fieldType={ PLAYER_TYPE.USER } />
              <Field fieldType={ PLAYER_TYPE.ENEMY } />
            </>
          )
        }
      </FieldsContainer>
    </MainScreenContainer>
  );
};
