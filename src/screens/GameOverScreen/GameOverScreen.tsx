import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLAYER_TYPE } from '../../store/reducers/game-slice';
import { RootState, setScreen } from '../../store';
import { Button } from '../../components/Button';
import { GameLostBG, GameOverContainer, GameWonBG, WinnerPanel } from './GameOverScreen.styles.ts';
import { SCREEN_TYPE } from '../../store/reducers/app-slice';


export const GameOverScreen: React.FC = () => {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.game.score);
  const username = useSelector((state: RootState) => state.app.username);

  const [winner, loser] = score[PLAYER_TYPE.USER] > score[PLAYER_TYPE.ENEMY]
    ? [PLAYER_TYPE.USER, PLAYER_TYPE.ENEMY]
    : [PLAYER_TYPE.ENEMY, PLAYER_TYPE.USER];

  const winnerName = winner === PLAYER_TYPE.USER ? username : 'компьютер';
  const [winnerScore, loserScore] = [score[winner], score[loser]];


  const goToStartScreen = () => {
    dispatch(setScreen(SCREEN_TYPE.START));
  };

  return (
    <GameOverContainer>
      { winner === PLAYER_TYPE.USER
        ? <GameWonBG />
        : <GameLostBG />
      }
      <WinnerPanel>
        Выиграл { winnerName } со счетом { winnerScore }:{ loserScore }
      </WinnerPanel>
      <Button
        onClick={ goToStartScreen }
      >
        Вернуться на стартовый экран
      </Button>
    </GameOverContainer>
  );
};
