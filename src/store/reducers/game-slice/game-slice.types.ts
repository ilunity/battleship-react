import { PLAYER_TYPE } from '../field-slice';

export interface GameScore {
  [PLAYER_TYPE.USER]: number;
  [PLAYER_TYPE.ENEMY]: number;
}

export enum GAME_STATUS {
  SHIPS_ARRANGEMENT = 'shipsArrangement',
  STARTED = 'started',
  STOPPED = 'stopped',
}

export interface GameSliceState {
  time: number;
  status: `${GAME_STATUS}`;
  score: GameScore;
}

// --------------------------------------------------------------------------------------------------------------------

export interface SetScorePayload {
  player: PLAYER_TYPE;
  score: number;
}

export type SetStatusPayload = GAME_STATUS;
