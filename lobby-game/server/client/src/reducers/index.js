import { combineReducers } from 'redux-immutable';
import { handleActions } from 'redux-actions';
import { MenuState, GameInfoState, TetrominoState, ActiveTetrominoesState } from '../constants/models';
import Constants from '../constants/constants';

const { initialGrid, tetrominoes, blockUnit } = Constants;

const menuReducer = handleActions({
  PLAY_GAME: (state) => (
    state.set('globalGameStatus', 'PLAYING')
  )
}, MenuState);

const gameInfoReducer = handleActions({
  PAUSE_GAME: (state) => (
    state.set('gameStatus', 'PAUSED')
  ),
  UNPAUSE_GAME: (state) => (
    state.set('gameStatus', 'PLAYING')
  ),
  GAME_OVER: (state) => (
    state.set('gameStatus', 'GAME_OVER')
  ),
  ADD_POINTS: (state, { payload }) => (
    state.set('points', state.get('points') + payload)
  ),
  ADD_CLEARED_LINES: (state, { payload }) => (
    state.set('clearedLines', state.get('clearedLines') + payload)
  )
}, GameInfoState);

const currentTetrominoReducer = handleActions({
  SET_CURRENT_TETROMINO: (state, { payload }) => ({
      shape: tetrominoes[payload.currentRandomShape].shape,
			name: payload.currentRandomShape,
			color: tetrominoes[payload.currentRandomShape].color,
			offsetX: blockUnit * 3,
			offsetY: 0,
  }),
  MOVE_RIGHT: (state) => (
    Object.assign({}, state, { offsetX: state.offsetX + blockUnit })
  ),
  MOVE_LEFT: (state) => (
    Object.assign({}, state, { offsetX: state.offsetX - blockUnit })
  ),
  MOVE_DOWN: (state) => (
    Object.assign({}, state, { offsetY: state.offsetY + blockUnit })
  ),
  ROTATE_TETROMINO: (state, { payload }) => (
    Object.assign({}, state, { shape: payload })
  ),
  ADD_CURRENT_TETROMINO: (state, { payload }) => (
    Object.assign({}, payload, { offsetX: blockUnit * 3, offsetY: 0 })
  )
}, TetrominoState);

const nextTetrominoReducer = handleActions({
  ADD_NEXT_TETROMINO: (state, { payload }) => ({
    shape: tetrominoes[payload].shape,
		name: payload,
		color: tetrominoes[payload].color,
		offsetX: 10,
		offsetY: blockUnit,
  })
}, {});

const activeTetrominoesReducer = handleActions({
  SET_INIT_ACTIVE_TETROMINOES: (state) => (
    state.set('activeTetrominoes', initialGrid)
  ),
  ADD_NEW_CLEARED_GRID: (state, { payload }) => (
    state.set('activeTetrominoes', payload)
  )
}, ActiveTetrominoesState);

const rootReducer = combineReducers({
  menuReducer,
  gameInfoReducer,
  currentTetrominoReducer,
  nextTetrominoReducer,
  activeTetrominoesReducer
});

export default rootReducer;
