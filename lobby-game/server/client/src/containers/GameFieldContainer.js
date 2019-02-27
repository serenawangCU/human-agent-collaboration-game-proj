import { connect } from 'react-redux';
import GameField from '../components/GameField';

const GameFieldContainer = connect(
  (state) => ({
    isPlaying: state.getIn(['menuReducer', 'globalGameStatus']) === 'PLAYING',
    isPaused: state.getIn(['gameInfoReducer', 'gameStatus']) === 'PAUSED',
    isGameOver: state.getIn(['gameInfoReducer', 'gameStatus']) === 'GAME_OVER',
  })
)(GameField);

export default GameFieldContainer;
