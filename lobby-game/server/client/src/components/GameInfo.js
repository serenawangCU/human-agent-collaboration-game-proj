import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Layer, Stage } from 'react-konva';
import NextTetrominoContainer from '../containers/NextTetrominoContainer';
import PropTypes from 'prop-types';

const GameInfo = ({ points, clearedLines, isPlaying, isPaused, isGameOver, changePauseState }) => {

  const buttonStyle = {
		margin: '20% 0',
	};

  if(isPlaying) {
    return (
      <div id="gameInfo">
        <RaisedButton
          label={isPaused ? 'UNPAUSE' : 'PAUSE'}
          style={buttonStyle}
          primary
          onClick={changePauseState(isPaused)}
          disabled={isGameOver}
        />
        <div className="scorePanel">
          <h2>Next</h2>
          <Stage width={250} height={100}>
            <Layer>
							<NextTetrominoContainer />
            </Layer>
          </Stage>
        </div>
        <div className="scorePanel">
          <h2>Player</h2>
          <span className="scoreInfo">{ 'Player1' }</span>
					<h2>Score</h2>
					<span className="scoreInfo">{ points }</span>
					<h2>Lines</h2>
					<span className="scoreInfo">{ clearedLines }</span>
				</div>
      </div>
    );
  }
  return null;
};

GameInfo.propTypes = {
  points: PropTypes.number,
  clearedLines: PropTypes.number,
  isPlaying: PropTypes.bool,
  isPaused: PropTypes.bool,
  isGameOver: PropTypes.bool,
  changePauseState: PropTypes.func,
}

export default GameInfo;
