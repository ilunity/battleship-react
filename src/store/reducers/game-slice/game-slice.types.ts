export enum FIELD_CELL_TYPE {
  NONE = 'none',
  MISS = 'miss',
  HIT = 'hit',
}

export enum SHIP_DIRECTION {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface ShipState {
  direction: `${SHIP_DIRECTION}`;
  x: number;
  y: number;
  size: number;
}

type ShipSize = number;
type ShipsCount = number;
export type UnplacedShipState = Record<ShipSize, ShipsCount>;

export interface FieldState {
  fieldStatuses: `${FIELD_CELL_TYPE}`[][];
  ships: ShipState[];
  unplacedShips: UnplacedShipState;
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

export interface ArrangeShipPayload {
  field: `${PLAYER_TYPE}`;
  size: number;
  x: number;
  y: number;
  direction: `${SHIP_DIRECTION}`;
}

export interface MoveShipPayload {
  field: `${PLAYER_TYPE}`;
  shipIndex: number;
  xTo: number;
  yTo: number;
}

export interface RotateShipPayload {
  field: `${PLAYER_TYPE}`;
  shipIndex: number;
}

export interface RandomShipLocationPayload {
  field: `${PLAYER_TYPE}`;
}

export interface ClearFieldPayload {
  field: `${PLAYER_TYPE}`;
}