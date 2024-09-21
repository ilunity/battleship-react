import React, { useEffect, useRef } from 'react';
import { Button } from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { incrementTimer, startTimer, stopTimer } from '../../store/reducers/game-slice';
import { TimerClock, TimerContainer } from './Timer.styles.ts';


const secondsDiv = 1000;
const minutesDiv = secondsDiv * 60;
const hoursDiv = minutesDiv * 60;

export const Timer: React.FC = () => {
  const dispatch = useDispatch();
  const { time, status } = useSelector((state: RootState) => state.game.timer);
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
    dispatch(startTimer());
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    dispatch(stopTimer());
  };

  useEffect(() => {
    start();

    return pause;
  }, []);

  const seconds = Math.floor((time % minutesDiv) / secondsDiv);
  const minutes = Math.floor((time % hoursDiv) / minutesDiv);

  return (
    <TimerContainer>
      <TimerClock>
        Время игры { minutes }:{ seconds }
      </TimerClock>
      {
        status === 'started'
          ? <Button onClick={ pause }>Пауза</Button>
          : <Button onClick={ start }>Старт</Button>
      }
    </TimerContainer>
  );
};
