import React, { useEffect, useRef } from 'react';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GAME_STATUS, incrementTimer, startGame, stopGame } from '../../store/reducers/game-slice';
import { TimerClock, TimerContainer } from './Timer.styles.ts';


const secondsDiv = 1000;
const minutesDiv = secondsDiv * 60;
const hoursDiv = minutesDiv * 60;

export const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.game.time);
  const gameStatus = useSelector((state: RootState) => state.game.status);

  const isNotShipsArrangementStatus = gameStatus !== GAME_STATUS.SHIPS_ARRANGEMENT;

  const prevTimeRef = useRef<number>(0);
  const intervalRef = useRef<number>();

  const start = () => {
    prevTimeRef.current = new Date().getTime();

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - prevTimeRef.current;
      dispatch(incrementTimer(diff));
      prevTimeRef.current = now;
    }, 1000);
    dispatch(startGame());
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    dispatch(stopGame());
  };

  useEffect(() => {
    if (!isNotShipsArrangementStatus) {
      return;
    }

    start();


    return pause;
  }, [isNotShipsArrangementStatus]);

  const seconds = Math.floor((time % minutesDiv) / secondsDiv);
  const minutes = Math.floor((time % hoursDiv) / minutesDiv);

  return (
    <TimerContainer>
      <TimerClock>
        Время игры { minutes }:{ seconds }
      </TimerClock>
      {
        isNotShipsArrangementStatus && (
          gameStatus === GAME_STATUS.STARTED
            ? <Button onClick={ pause }>Пауза</Button>
            : <Button onClick={ start }>Старт</Button>
        )
      }
    </TimerContainer>
  );
};
