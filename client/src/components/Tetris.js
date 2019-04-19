import React, {Component} from 'react';
import GamePanel from './GamePanel';
import './Tetris.css'
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom'




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
            showPopup: false,
            score : 0,
            redirectSurvey: false,
            redirectHome: false
        }

    }

    componentDidMount() {    
        this.gameStatus();
        this.updateScore();
    }

    gameStatus() {
        this.props.socket.on('game_over',() => {
            this.setState({gameOver: true, showPopup: true});
        });
    }

    updateScore() {
        this.props.socket.on('score', (data) => {
            this.setState({score: data.score});
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
                            finalscore = {this.state.score}
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
    // toSurvey = () => {
    //     this.props.history.push(`/survey`)
    // };
    // toHome = () => {
    //     this.props.history.push(`/home`)
    // };

    render() {
      return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>Score:<br /> {this.props.finalscore}<br />{this.props.text}</h1>
                <div className='button'>
                <NavLink to="/survey">Yes</NavLink>
                <NavLink to="/home">No</NavLink>
                </div>
            </div>
        </div>
        
      );
    }
  }


export default Tetris;