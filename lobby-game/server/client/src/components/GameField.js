import React from 'react';
import { Layer, Stage } from 'react-konva';
import CurrentTetrominoContainer from '../containers/CurrentTetrominoContainer';
import ActiveTetrominoesContainer from '../containers/ActiveTetrominoesContainer';
import constants from '../constants/constants';
import BannerContainer from '../containers/BannerContainer';
import PropTypes from 'prop-types';

const { fieldWidth, fieldHeight } = constants;

const GameField = ({ isPlaying, isPaused, isGameOver }) => {

  if(isPlaying) {
    return (
      <div>
        <div id="gameField">
          <Stage width={fieldWidth} height={fieldHeight}>
            <Layer>
              <CurrentTetrominoContainer />
              <ActiveTetrominoesContainer />
            </Layer>
          </Stage>
          { isPaused ? <BannerContainer label="PAUSED" color="white" /> : null }
          { isGameOver ? <BannerContainer label="GAME OVER" color="red" /> : null }
        </div>
      </div>
    );
  }
  return null;
}

GameField.propTypes = {
  isPlaying: PropTypes.bool,
  isPaused: PropTypes.bool,
  isGameOver: PropTypes.bool,
}

export default GameField;
