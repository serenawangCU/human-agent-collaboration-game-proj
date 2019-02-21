import { connect } from 'react-redux';
import { pauseGame, unpauseGame } from '../actions/index';
import GameInfo from '../components/GameInfo';

const GameInfoContainer = connect(
  (state) => ({
    isPlaying: state.getIn(['menuReducer', 'globalGameStatus']) === 'PLAYING',
    isPaused: state.getIn(['gameInfoReducer', 'gameStatus']) === 'PAUSED',
    isGameOver: state.getIn(['gameInfoReducer', 'gameStatus']) === 'GAME_OVER',
    points: state.getIn(['gameInfoReducer', 'points']),
    clearedLines: state.getIn(['gameInfoReducer', 'clearedLines'])
  }),
  (dispatch) => ({
    changePauseState: (isPaused) => () => {
      if(isPaused) {
        dispatch(unpauseGame());
      } else {
        dispatch(pauseGame());
      }
    },
  })
)(GameInfo);

export default GameInfoContainer;
