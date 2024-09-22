export enum FIELD_CELL_TYPE {
  NONE = 'none',
  MISS = 'miss',
  HIT = 'hit',
}

export enum SHIP_POSITION {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface ShipState {
  position: `${SHIP_POSITION}`;
  x: number;
  y: number;
  size: number;
}

export interface FieldState {
  fieldStatuses: `${FIELD_CELL_TYPE}`[][];
  ships: ShipState[];
  cellsWithShip: CellsWithShip;
}

export type CellsWithShip = Record<string, boolean>;

export enum PLAYER_TYPE {
  USER = 'user',
  ENEMY = 'enemy',
}

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
  [PLAYER_TYPE.USER]: FieldState;
  [PLAYER_TYPE.ENEMY]: FieldState;
}

// --------------------------------------------------------------------------------------------------------------------

export interface SetScorePayload {
  player: `${PLAYER_TYPE}`;
  score: number;
}

export interface SetCellPayload {
  fieldType: `${PLAYER_TYPE}`;
  x: number;
  y: number;
  cellType: `${FIELD_CELL_TYPE}`;
}

export interface CheckShipOnCellPayload {
  field: `${PLAYER_TYPE}`;
  x: number;
  y: number;
}

export interface MoveShipPayload {
  field: `${PLAYER_TYPE}`;
  index: number;
  x: number;
  y: number;
}

export interface RotateShipPayload {
  field: `${PLAYER_TYPE}`;
  index: number;
}