import React, { ReactNode } from 'react';
import { useSelector } from "react-redux";
import { RootState } from '../../../store';
import { Layout } from '../../../components/Layout';
import { GameOverScreen, MainScreen, StartScreen } from '../../../screens';
import { SCREEN_TYPE } from '../../../store/reducers/app-slice';


const CurrentScreenMap: Record<`${SCREEN_TYPE}`, ReactNode> = {
  [SCREEN_TYPE.START]: <StartScreen/>,
  [SCREEN_TYPE.MAIN]: <MainScreen/>,
  [SCREEN_TYPE.GAME_OVER]: <GameOverScreen/>,
}

export const Router: React.FC = () => {
  const currentScreen = useSelector((state: RootState) => state.app.currentScreen);

  return (
    <Layout>
      { CurrentScreenMap[currentScreen] }
    </Layout>
  );
};
