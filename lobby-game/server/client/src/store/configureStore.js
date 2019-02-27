import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxMulti from 'redux-multi'
import Immutable from 'immutable';
import CreateLogger from 'redux-logger';
import TetrisApp from '../reducers/index';

const initialState = Immutable.Map();

export default createStore(
  TetrisApp,
  initialState,
  applyMiddleware(
    ReduxThunk,
    ReduxMulti,
    CreateLogger({ stateTransformer: state => state.toJS() }))
);
