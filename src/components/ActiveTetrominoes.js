import React from 'react';
import { Rect, Group } from 'react-konva';
import Constants from '../constants/constants';

const { blockUnit } = Constants;

const ActiveTetrominoes = ({ grid }) => {
	const arr = [];
	grid.forEach((val, i) => {
		val.forEach((block, j) => {
			if (block !== 'grey') {
				const key = JSON.stringify({ x: i, y: j });
				arr.push(
					<Rect
						key={key}
						width={blockUnit}
						height={blockUnit}
						x={i * 30}
						y={j * 30}
						fill={block}
						stroke="black"
						strokeWidth={4.5}
					/>
				);
			}
		});
	});
	return <Group>{ arr }</Group>;
};

ActiveTetrominoes.propTypes = {
	grid: React.PropTypes.array,
};

export default ActiveTetrominoes;
