export interface TimerState {
    time: number;
    status: 'started' | 'stopped';
}

export enum FIELD_CELL_TYPE {
    NONE = 'none',
    MISS = 'miss',
    HIT = 'hit',
}

export interface FieldState {
    fieldStatuses: `${FIELD_CELL_TYPE}`[][];
    ships: number;
}

export enum PLAYER_TYPE {
    USER = 'user',
    ENEMY = 'enemy',
}

export interface GameScore {
    [PLAYER_TYPE.USER]: number;
    [PLAYER_TYPE.ENEMY]: number;
}

export interface GameSliceState {
    timer: TimerState;
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