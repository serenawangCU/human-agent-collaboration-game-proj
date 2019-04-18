import React, {Component} from 'react';
import GamePanel from './GamePanel';
import './Tetris.css'
import styled from 'styled-components';

const Left = styled.div`
display: inline-block;
vertical-align: top;
margin-left: 30%;
padding-top: 10px;
`;

// const Right = styled.div`
// display: inline-block;
// vertical-align: top;
// margin-right: 20%;
// padding-top: 20px;
// `;

class Tetris extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOver: false,
            showPopup: false
        }

    }

    componentDidMount() {    
        this.gameStatus();
    }

    gameStatus() {
        this.props.socket.on('game_over',() => {
            this.setState({gameOver: true, showPopup: true});
        });
    }

    render() {

        return (
            <div>
                <Left>
                    <GamePanel socket={this.props.socket}/>
                </Left>
                {this.state.showPopup ? 
                        <Popup
                            text='Take a survey?'
                            closePopup={this.togglePopup.bind(this)}
                        />
                    : null
                }
            </div>
        )
    }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }
}

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>{this.props.text}</h1>
                <button onClick={this.props.closePopup}>Yes</button>
                <button onClick={this.props.closePopup}>No</button>
            </div>
        </div>
        
      );
    }
  }


export default Tetris;