import React from 'react';
import { FieldsContainer, MainScreenBG, MainScreenContainer, MainScreenInfo } from "./MainScreen.styles.ts";
import { Timer } from '../../components/Timer';
import { Score } from '../../components/Score';
import { Field } from '../../components/Field';
import { PLAYER_TYPE } from '../../store/reducers/game-slice';


export const MainScreen: React.FC = () => {
  return (
    <MainScreenContainer>
      <MainScreenBG/>
      <MainScreenInfo>
        <Timer/>
        <Score/>
      </MainScreenInfo>
      <FieldsContainer>
        <Field fieldType={ PLAYER_TYPE.USER }/>
        <Field fieldType={ PLAYER_TYPE.ENEMY }/>
      </FieldsContainer>
    </MainScreenContainer>
  );
};
