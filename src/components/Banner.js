import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const Banner = ({ label, color, newGame }) => (
	<div id="banner">
		<h1 style={{ paddingTop: '250px', color }}>{label}</h1>
		{ label === 'GAME OVER' ?
			<MuiThemeProvider>
			<RaisedButton
				label="New Game"
				onClick={newGame}
			/>
			</MuiThemeProvider> : null
		}
	</div>
);

Banner.propTypes = {
	label: React.PropTypes.string,
	color: React.PropTypes.string,
	newGame: React.PropTypes.func,
};

export default Banner;
