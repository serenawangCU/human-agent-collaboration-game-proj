import { connect } from 'react-redux';
import ActiveTetrominoes from '../components/ActiveTetrominoes';

const ActiveTetrominoesContainer = connect(
  (state) => ({ grid: state.getIn(['activeTetrominoesReducer', 'activeTetrominoes']) })
)(ActiveTetrominoes);

export default ActiveTetrominoesContainer;
