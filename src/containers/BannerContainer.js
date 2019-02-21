import { connect } from 'react-redux';
import { unpauseGame, setInitActiveTetrominoes } from '../actions/index';
import { startGame } from '../containers/MenuContainer';
import Banner from '../components/Banner';

const BannerContainer = connect(
  (state, ownProps) => ({
    label: ownProps.label,
    color: ownProps.color,
  }),
  (dispatch) => ({
    newGame: () => {
      dispatch([unpauseGame(), startGame(false), setInitActiveTetrominoes()]);
    },
  })
)(Banner);

export default BannerContainer;
