import Constants from '../constants/constants';

let occupied = (grid, x, y) => {
	return grid[x][y] !== 'grey';
}

export const getActualCoordinates = (newTetromino) => {
	let coordinates = [],
			{ shape, offsetX, offsetY } = newTetromino,
			{ blockUnit } = Constants;

	for(let i = 0; i < shape.length; i++) {
		for(let j = 0; j < shape[i].length; j++) {
			if(shape[i][j]) {
				coordinates.push({ x: j + (offsetX / blockUnit), y: i + (offsetY / blockUnit) });
			}
		}
	}
	return coordinates;
}

export const getNewColoredGrid = (grid, tetromino, color) => {
	let 	gridCopy = grid.map((x) => [...x]),
				coords = getActualCoordinates(tetromino);

	for(let j = 0; j < coords.length; j++) {
		let { x, y } = coords[j];
		gridCopy[x][y] = color;
	}
	return gridCopy;
}

export const getCompletedLines = (grid, tetromino) => {
	let 	linesToClear = [],
				gridCopy = getNewColoredGrid(grid, tetromino, 'tmp'),
				coords = getActualCoordinates(tetromino),
				rows = coords.reduce((prev, cur) => {
					prev[cur.y] = prev[cur.y] ? prev[cur.y] + 1 : 1;
					return prev;
				}, []);

	for(const row in rows) {
		let flag = true;
		for(let j = 0; j < 10; j++) {
			if(gridCopy[j][row] === 'grey') {
				flag = false;
			}
		}
		if(flag) {
			linesToClear.push(row);
		}
	}
	return linesToClear;
}

export const getNewClearedGrid = (grid, tetromino, color) => {
	let	linesToClear = getCompletedLines(grid, tetromino),
			gridCopy = getNewColoredGrid(grid, tetromino, color);

	for(const row of linesToClear) {
		for(let j = 0; j < 10; j++) {
			gridCopy[j][row] = 'grey';
		}
	}
	for(let row = linesToClear[0] - 1; row >= 0; row--) {
		let shift = linesToClear.length;
		for(let j = 0; j < 10; j++) {
			gridCopy[j][row + shift] = gridCopy[j][row];
		}
	}
	return gridCopy;
}

export const rotateArray = (tetromino) => {
	let	matrix = tetromino.shape,
			n = matrix.length,
			ret = [[], [], [], []],
			closestX = 10;

	for(let i = 0; i < n; ++i) {
		for(let j = 0; j < n; ++j) {
			ret[i][j] = matrix[n - j - 1][i];
			if(ret[i][j]) {
				closestX = Math.min(closestX, j);
			}
		}
	}
	let fill = new Array(closestX).fill(0);
	for(let i = 0; i < n; ++i) {
		ret[i] = ret[i].slice(closestX).concat(fill);
	}
	return ret;
}

export const checkCollisions = (direction, activeTetrominos, currentTetromino) => {
	const { blockUnit } = Constants;
	let	currentX = currentTetromino.offsetX / blockUnit,
			currentY = currentTetromino.offsetY / blockUnit,
			collision = false,
			gameOver = false,
			nx = 0, ny = 0;

	switch(direction) {
		case "left":
			nx = -1;
			break;
		case "right":
			nx = 1;
			break;
		case "down":
			ny = 1;
			break;
	}

	for(let i = 0; i < currentTetromino.shape.length; i++) {
		for(let j = 0; j < currentTetromino.shape[i].length; j++) {
			let coord = currentTetromino.shape[i][j];
			if(coord) {
				let totalX = nx + currentX + j,
						totalY = ny + currentY + i;
				if(totalX < 0 || totalY >= 22 || totalX >= 10 || occupied(activeTetrominos, totalX, totalY)) {
					collision = true;
				}
				if(collision && currentY === 0 && direction === 'down') {
					gameOver = true;
				}
			}
		}
	}
	return gameOver ? 'GAME_OVER' : collision;
}
