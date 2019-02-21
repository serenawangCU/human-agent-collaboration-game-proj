import { connect } from 'react-redux';
import Tetromino from '../components/Tetromino';

const CurrentTetrominoContainer = connect(
  (state) => {
    const tmp = state.get('currentTetrominoReducer');
    if (tmp.shape !== undefined) {
      return  {  shape:  tmp.shape,
        name:  tmp.name,
        color: tmp.color,
        offsetX: tmp.offsetX,
        offsetY: tmp.offsetY
      }
    }
    return {
      shape:  [],
      name: '',
      color:  '',
      offsetX:  0,
      offsetY:  0,
    }
  }
)(Tetromino);

export default CurrentTetrominoContainer;
