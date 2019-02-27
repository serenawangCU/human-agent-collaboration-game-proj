import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

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
	label: PropTypes.string,
	color: PropTypes.string,
	newGame: PropTypes.func,
};

export default Banner;
