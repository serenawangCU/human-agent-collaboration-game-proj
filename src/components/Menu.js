import React from 'react';

class Menu extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.props.handleSpaceBar);
  }

  render() {
    if(this.props.isPlaying) {
      window.removeEventListener('keyup', this.props.handleSpaceBar);
    }

    return (
      <div>
        <h1 id="pageMenu">Tetris</h1>
        {!this.props.isPlaying ? <h2 style={{color:'gray'}}>Press spacebar to play the game!</h2> : null}
      </div>
    );
  }
}

Menu.propTypes = {
  isPlaying: React.PropTypes.bool,
  handleSpaceBar: React.PropTypes.func,
}

export default Menu;
