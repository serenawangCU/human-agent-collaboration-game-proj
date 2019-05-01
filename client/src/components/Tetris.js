import React, {Component} from 'react';
import GamePanel from './GamePanel';
import OfflinePopup from './OfflinePopupComponent';
import GameOverPopup from './GameOverPopupComponent';
import '../styles/Tetris.css'
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import './Tetris.css'
import instructions from './Instructions.png';


const Left = styled.div`
display: inline-block;
vertical-align: top;
margin-left: 10%;
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
            score : 0,
            indivScore: 0,
            totalScoreRanking : 1,
            numberOfGamesInDB : 2,
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
        this.props.socket.on('game_over',(data) => {
            // data.totalScore
            // data.players
            // data.indivScores
            console.log('game over');
            console.log(data.totalScoreRanking);
            console.log(data.numberOfGamesInDB);
            console.log(data.indivScores);
            document.body.style.opacity = 1.0;
            this.setState({totalScoreRanking: data.totalScoreRanking});
            this.setState({numberOfGamesInDB: data.numberOfGamesInDB});
            this.setState({score: data.totalScore});
            this.setState({gameOver: true});
            this.setState({indivScore: data.indivScores});
        });
        //add listner for the connection state of user's partner
        this.props.socket.on('leaving',() => {
            document.body.style.opacity = 1.0;
            this.setState({partnerOnline: false});
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
                    <div className="wrap">
                        <Row>
                            <Col md={3} xs={12}>
                                <Right>
                                    <p>
                                    During the game, you and your partner will be assigned who's next by an AI. 
                                    When it is not your turn, your screen will turn grey and you will not be able to
                                    move the tetromino.
                                    <br></br>
                                    <br></br>
                                    You will be able to control your tetromino by using the arrow keys. 
                                    </p>
                                    <Col md={{size: 6}}>
                                        <img src={instructions} width = "200%" length = "200%" alt="Up: Rotate, Left: Move Left, Right: Move Right, Down: Drop"/>
                                    </Col>
                                </Right>
                            </Col>
                            <Col md={9} xs={12}>
                                <Left>
                                    <GamePanel socket={this.props.socket}/>
                                </Left>
                            </Col>
                        </Row>
                    </div>
                </Container>
                {this.state.partnerOnline ? 
                        null
                    : 
                        <OfflinePopup
                            closePopup={this.togglePopup.bind(this)}
                        />
                }
                {this.state.gameOver ?
                    // <Redirect push to={`/gameover`} />
                    <GameOverPopup
                            totalScoreRanking={this.state.totalScoreRanking}
                            numberOfGamesInDB={this.state.numberOfGamesInDB}
                            totalScore={this.state.score}
                            socket={this.props.socket}
                            closePopup={this.togglePopup.bind(this)}
                            indivScore={this.state.indivScore}
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