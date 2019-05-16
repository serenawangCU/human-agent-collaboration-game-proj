import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';


/**
 * Header Component for header of our system
 */
class Header extends Component {

	render() {
		return(
			<header className="App-header mb-3">
				<div>Tetris Game with Partner</div>
			</header>
		);
	}
}

export default Header;