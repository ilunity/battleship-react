export enum SCREEN_TYPE {
    START = 'start',
    MAIN = 'main',
    GAME_OVER = 'gameOver',
}

export interface AppSliceState {
    currentScreen: `${SCREEN_TYPE}`;
    username: string;
}