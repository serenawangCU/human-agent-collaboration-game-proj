import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuContainer from '../containers/MenuContainer';
import GameFieldContainer from '../containers/GameFieldContainer';
import GameInfoContainer from '../containers/GameInfoContainer';

injectTapEventPlugin();

const TetrisGame = () => (
  <div>
    <div>
      <MenuContainer />
    </div>
    <div>
      <GameFieldContainer />
      <MuiThemeProvider>
        <GameInfoContainer />
      </MuiThemeProvider>
    </div>
  </div>
);

export default TetrisGame;
