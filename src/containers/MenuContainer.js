import { connect } from 'react-redux';
import Menu from '../components/Menu';
import Constants from '../constants/constants';
import { rotateArray, checkCollisions, getCompletedLines, getNewClearedGrid } from '../lib/index.js';
import {
	playGame,
	gameOver,
	setInitActiveTetrominoes,
	setCurrentTetromino,
	rotateRight,
	moveDown,
	moveLeft,
	moveRight,
	addPoints,
	addClearedLines,
	addNextTetromino,
	addCurrentTetromino,
	addNewClearedGrid
} from '../actions/index.js';

let addTetromino = (currentTetromino, nextTetromino, activeTetrominoes) => (
	(dispatch) => {
		const	{ shapesMapping } = Constants;
		let 	newRandomNumber = Math.floor(Math.random() * 7),
					nextRandomShape = shapesMapping[newRandomNumber];

		dispatch([
			addNextTetromino(nextRandomShape),
			addNewClearedGrid(getNewClearedGrid(activeTetrominoes, currentTetromino, currentTetromino.color)),
			addCurrentTetromino(nextTetromino)
		]);
	}
);

let dropTetromino = (dispatch, startTime, getState) => {
	const state = getState();
	let 	currentTime = Date.now(),
				gameStatus = state.getIn(['gameInfoReducer', 'gameStatus']);

	if (currentTime - startTime >= 500 && gameStatus !== 'PAUSED' && gameStatus !== 'GAME_OVER') {
		startTime = currentTime;
		dispatch(moveTetromino('down'));
	}
	requestAnimationFrame((dropTetromino.bind(this, dispatch, startTime, getState)));
}

let rotateTetromino = () => (
	(dispatch, getState) => {
		const state = getState();
		let		gameStatus = state.getIn(['gameInfoReducer', 'gameStatus']),
					activeTetrominoes = state.getIn(['activeTetrominoesReducer', 'activeTetrominoes']),
					currentTetromino = state.get('currentTetrominoReducer'),
					rotatedTetromino = Object.assign({}, currentTetromino);

		rotatedTetromino.shape = rotateArray(rotatedTetromino);

		if (!checkCollisions('rotation', activeTetrominoes, rotatedTetromino) && gameStatus === 'PLAYING') {
			dispatch(rotateRight(rotatedTetromino.shape));
		}
	}
);

let moveTetromino = (direction) => (
	(dispatch, getState) => {
		const state = getState();
		let		gameStatus = state.getIn(['gameInfoReducer', 'gameStatus']),
					activeTetrominoes = state.getIn(['activeTetrominoesReducer', 'activeTetrominoes']),
					currentTetromino = state.get('currentTetrominoReducer'),
					nextTetromino = state.get('nextTetrominoReducer'),
					collisionCheck = checkCollisions(direction, activeTetrominoes, currentTetromino);

		if(gameStatus === 'PAUSED' || gameStatus === 'GAME_OVER') {
			return;
		}

		switch(direction) {
			case 'left':
				if(collisionCheck === false) {
					dispatch(moveLeft());
				}
				return;
			case 'right':
				if(collisionCheck === false) {
					dispatch(moveRight());
				}
				return;
			case 'down':
				if(collisionCheck === false) {
					dispatch(moveDown());
				} else if(collisionCheck === 'GAME_OVER') {
					dispatch(gameOver());
				} else {
					let clearedLines = getCompletedLines(activeTetrominoes, currentTetromino).length,
							points = Math.pow(clearedLines, 2) * 100;
					dispatch([addPoints(points), addClearedLines(clearedLines)]);
					dispatch(addTetromino(currentTetromino, nextTetromino, activeTetrominoes));
				}
				return;
			default:
				return;
		}
	}
);

export const startGame = (firstTime) => (
	(dispatch, getState) => {
		const { shapesMapping } = Constants;
		let currentRandomNumber = Math.floor(Math.random() * 7),
				nextRandomNumber = Math.floor(Math.random() * 7),
				currentRandomShape = shapesMapping[currentRandomNumber],
				nextRandomShape = shapesMapping[nextRandomNumber];

		dispatch([setCurrentTetromino({ currentRandomShape }), addNextTetromino(nextRandomShape)]);

		if(firstTime)
			dropTetromino(dispatch, Date.now(), getState); // Let Tetromino drop
	}
);

const MenuContainer = connect(
	(state) => ({
		isPlaying: state.getIn(['menuReducer', 'globalGameStatus']) === 'PLAYING',
	}),
	(dispatch) => ({
		handleSpaceBar: (e) => {
			if(e.keyCode === 32) {
        dispatch([playGame(), setInitActiveTetrominoes()]);
				dispatch(startGame(true));

				let handleMoving = (e) => {
					switch(e.keyCode) {
						case 37:
							e.preventDefault();
							dispatch(moveTetromino('left'));
							break;
						case 39:
							e.preventDefault();
							dispatch(moveTetromino('right'));
							break;
						case 40:
							e.preventDefault();
							dispatch(moveTetromino('down'));
							break;
						default:
							break;
					}
				};

				let handleRotation = (e) => {
					switch(e.keyCode) {
						case 38:
							e.preventDefault();
							dispatch(rotateTetromino());
							break;
						default:
							break;
					}
				};

				window.addEventListener('keydown', handleMoving);
				window.addEventListener('keydown', handleRotation);
			}
		}
	})
)(Menu);

export default MenuContainer;
