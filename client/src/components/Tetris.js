import React, {Component} from 'react';
import GamePanel from './GamePanel';
import Popup from './Popup';
import './Tetris.css'
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom';




const Left = styled.div`
display: inline-block;
vertical-align: top;
margin-left: 30%;
padding-top: 10px;
`;

const Right = styled.div`
display: inline-block;
vertical-align: top;
padding-top: 10px;
`;



class Tetris extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOver: false,
            showPopup: false,
            score : 0,
            redirectSurvey: false,
            redirectHome: false,
            partnerOnline: true,
            popupType: ''
        }
        this.gameStatus();
        this.updateScore();
    }

    componentWillUnmount() {
        this.props.socket.off('score');
        this.props.socket.off('game_over');
        this.props.socket.off('leaving');
    }


    gameStatus() {
        this.props.socket.on('game_over',() => {
            document.body.style.opacity = 1.0;
            this.setState({gameOver: true, showPopup: true, popupType: 'survey'});
        });
        //add listner for the connection state of user's partner
        this.props.socket.on('leaving',() => {
            document.body.style.opacity = 1.0;
            this.setState({partnerOnline: false, showPopup: true, popupType: 'offline'});
            this.props.socket.off('game_over');
            this.props.socket.off('score');
            //console.log("leeeeeft!");
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
                <Container>
                    <Row>
                        <Col xs="3">
                            <Right>
                        
                                <p>
                                During the game, you and your partner will be assigned who's next by an AI. 
                                When it is not your turn, your screen will turn grey and you will not be able to
                                move the tetromino.
                                <br></br>
                                <br></br>
                                You will be able to control your tetromino by using the arrow keys. 
                                </p>
                            </Right>
                        </Col>
                        <Col xs="9">
                            <Left>
                                <GamePanel socket={this.props.socket}/>
                            </Left>
                        </Col>
                    </Row>
                </Container>
                {this.state.showPopup ? 
                        <Popup
                            popupType = {this.state.popupType}
                            finalscore = {this.state.score}
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




export default Tetris;