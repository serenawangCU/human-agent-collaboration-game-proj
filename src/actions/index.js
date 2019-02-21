import { createAction } from 'redux-actions';

export const playGame = createAction('PLAY_GAME');
export const setInitActiveTetrominoes = createAction('SET_INIT_ACTIVE_TETROMINOES')
export const pauseGame = createAction('PAUSE_GAME');
export const unpauseGame = createAction('UNPAUSE_GAME');
export const gameOver = createAction('GAME_OVER');
export const setCurrentTetromino = createAction('SET_CURRENT_TETROMINO');
export const rotateRight = createAction('ROTATE_TETROMINO');
export const moveDown = createAction('MOVE_DOWN');
export const moveLeft = createAction('MOVE_LEFT');
export const moveRight = createAction('MOVE_RIGHT');
export const addPoints = createAction('ADD_POINTS');
export const addClearedLines = createAction('ADD_CLEARED_LINES');
export const addNextTetromino = createAction('ADD_NEXT_TETROMINO');
export const addNewClearedGrid = createAction('ADD_NEW_CLEARED_GRID');
export const addCurrentTetromino = createAction('ADD_CURRENT_TETROMINO');
