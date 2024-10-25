export interface FieldSliceState {
  time: number;
  status: `${GAME_STATUS}`;
  score: GameScore;
  [PLAYER_TYPE.USER]: PlayerFieldState;
  [PLAYER_TYPE.ENEMY]: PlayerFieldState;
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

export enum PLAYER_TYPE {
  USER = 'user',
  ENEMY = 'enemy',
}

export interface PlayerFieldState {
  ships: Record<string, Ship>;
  cells: CellsArray;
}

export interface Ship {
  id: string;
  status: SHIP_STATUS;
  position: ShipPosition;
  size: number;
  unplaced: boolean;
  damage: number;
}


/* key: sum of coords strings
*  value: [id] for cells with ship
*         [f] for bordered cells
*         [null] for empty cells
* */
export type CellsArray = Cell[][];

export interface Cell {
  shipId: string | null;
  status: CELL_STATUS;
  borderCells: number;
}

export enum CELL_STATUS {
  MISS = 'miss',
  HIT = 'hit',
  NONE = 'none',
}

export enum SHIP_STATUS {
  UNDAMAGED = 'undamaged',
  DAMAGED = 'damaged',
  SUNK = 'sunk',
}

export interface ShipPosition {
  x: number;
  y: number;
  direction: SHIP_DIRECTION;
}

export enum SHIP_DIRECTION {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

// --------------------------------------------------------------------------------------------------------------------

export interface SetScorePayload {
  player: PLAYER_TYPE;
  score: number;
}

export type SetStatusPayload = GAME_STATUS;

export interface AddShipPayload {
  fieldType: PLAYER_TYPE;
  id: string;
  position: ShipPosition;
}

export type ArrangeShipPayload = AddShipPayload;

export type MoveShipPayload = AddShipPayload;

export interface RemoveShipPayload {
  fieldType: PLAYER_TYPE;
  id: string;
}

export interface RotateShipPayload {
  fieldType: PLAYER_TYPE;
  id: string;
}

export interface RandomLocationPayload {
  fieldType: PLAYER_TYPE;
}

export interface ClearLocationPayload {
  fieldType: PLAYER_TYPE;
}

export interface MakeShotPayload {
  fieldType: PLAYER_TYPE;
  x: number;
  y: number;
}