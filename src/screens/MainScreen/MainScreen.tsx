import React, { useEffect } from 'react';
import { FieldsContainer, MainScreenBG, MainScreenContainer, MainScreenInfo } from './MainScreen.styles.ts';
import { Timer } from '../../components/Timer';
import { Score } from '../../components/Score';
import { Field } from '../../components/Field';
import { useDispatch, useSelector } from 'react-redux';
import { makeComputerShot, RootState, setScreen } from '../../store';
import { ShipsArrangement } from '../../components/ShipsArrangementField';
import { GAME_STATUS, PLAYER_TYPE, useWinnerSelector } from '../../store/reducers/field-slice';
import { SCREEN_TYPE } from '../../store/reducers/app-slice';


export const MainScreen: React.FC = () => {
  const gameStatus = useSelector((state: RootState) => state.field.status);
  const isShipsArrangementStatus = gameStatus === GAME_STATUS.SHIPS_ARRANGEMENT;
  const moveTurn = useSelector((state: RootState) => state.field.moveTurn);
  const score = useSelector((state: RootState) => state.field.score);
  const dispatch = useDispatch();
  const winner = useWinnerSelector();

  useEffect(() => {
    if (moveTurn === PLAYER_TYPE.ENEMY) {
      setTimeout(() => dispatch(makeComputerShot()), 500)
    }
  }, [gameStatus, score, moveTurn]);

  useEffect(() => {
    if (winner) {
      dispatch(setScreen(SCREEN_TYPE.GAME_OVER));
    }
  }, [winner]);

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
