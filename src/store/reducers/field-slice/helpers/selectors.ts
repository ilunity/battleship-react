import { useSelector } from 'react-redux';
import { RootState } from '../../../store.ts';
import { PLAYER_TYPE } from '../field-slice.types.ts';

export const useWinnerSelector = (): PLAYER_TYPE | null => {
  const gameScore = useSelector((state: RootState) => state.field.score);
  if (gameScore[PLAYER_TYPE.USER] === 20) {
    return PLAYER_TYPE.USER;
  }

  if (gameScore[PLAYER_TYPE.ENEMY] === 20) {
    return PLAYER_TYPE.ENEMY;
  }

  return null;
};
