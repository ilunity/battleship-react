import React, { useEffect, useRef } from 'react';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer, RootState, setScreen, setStatus } from '../../store';
import { TimerClock, TimerContainer } from './Timer.styles.ts';
import { GAME_STATUS } from '../../store/reducers/field-slice';
import { SCREEN_TYPE } from '../../store/reducers/app-slice';


const secondsDiv = 1000;
const minutesDiv = secondsDiv * 60;
const hoursDiv = minutesDiv * 60;

export const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.field.time);
  const gameStatus = useSelector((state: RootState) => state.field.status);

  const isNotShipsArrangementStatus = gameStatus !== GAME_STATUS.SHIPS_ARRANGEMENT;

  const prevTimeRef = useRef<number>(0);
  const intervalRef = useRef<number>();

  const start = () => {
    prevTimeRef.current = new Date().getTime();

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - prevTimeRef.current;
      dispatch(decrementTimer(diff));
      prevTimeRef.current = now;
    }, 1000);
    dispatch(setStatus(GAME_STATUS.STARTED));
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    dispatch(setStatus(GAME_STATUS.STOPPED));
  };

  const finishGame = () => {
    pause();
    dispatch(setScreen(SCREEN_TYPE.GAME_OVER));
  };

  useEffect(() => {
    if (!isNotShipsArrangementStatus) {
      return;
    }

    start();

    return pause;
  }, [isNotShipsArrangementStatus]);

  useEffect(() => {
    if (time <= 0) {
      finishGame();
    }
  }, [time]);

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
