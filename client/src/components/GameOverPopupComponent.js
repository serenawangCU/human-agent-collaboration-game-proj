import React, {Component} from 'react';
import '../styles/Popup.css';
import { Container, Button, Form, FormGroup, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import CanvasComponent from './CanvasComponent.js';
import { Link } from 'react-router-dom';
import './GameOverPopupComponent.css'

class GameOverPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play_again : false,
            same_player : false
        }


        this.playAgain = this.playAgain.bind(this);
        this.playWithSamePlayer = this.playWithSamePlayer.bind(this);

    }


    playAgain(){
        this.setState({play_again : true});
        this.props.socket.emit('game_again', true);
    }

    playWithSamePlayer() {
        console.log("Click same player");
        this.setState({same_player : true});
        this.props.socket.emit('same_player', true);
    }

    renderPlay(play_again){
        if (play_again) {
            document.getElementById("playAgain").remove()
            return (
                <Form id="playAgain">
                    <h4>Do you want to play with the same person?</h4>
                    <FormGroup row>
                        <Col id="yes">
                            <Button color="primary" onClick={this.playWithSamePlayer}>
                                Yes
                            </Button>
                        </Col>
                        <Col id="no">
                            <Link to={`/lobby`}>
                                <Button color="primary">
                                    No
                                </Button>
                            </Link>
                        </Col>
                    </FormGroup>
                    {this.state.same_player ? <Redirect push to={`/lobby`} /> : null}
                </Form>
            )
        }
    }
        
    render() {
        document.body.style.opacity = 1.0;
        return (
            <div  className = "wrap">
            <div className='popup'>
                <div className='popup_inner'>
                    <header className="header">
				        <div>Game Over</div>
			        </header>
                    <Container id="content">
                        <Row>
                            <Col xs="2">
                                Individual Score
                            </Col>
                            <Col xs="2">
                                Total Score
                            </Col>
                            <Col xs="8">
                                Total Score Percentile
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="2">
                                {this.props.indivScore}
                            </Col>
                            <Col xs="2">
                                {this.props.totalScore}
                            </Col>
                            <Col xs="8">
                                <CanvasComponent 
                                    socket={this.props.socket}
                                    totalScoreRanking={this.props.totalScoreRanking}
                                    numberOfGamesInDB={this.props.numberOfGamesInDB}
                                />
                            </Col>
                        </Row>
                        <p id="explaination">
                            A score being in the <em>p</em>th percentile means that
                            about <em>p</em>% of all scores are less than or equal
                            to the original score. So, if a score of 100 is in the 50%
                            percentile, then 50% of all scores are less than or equal to
                            a score of 100.
                        </p>
                    

                        <Form id="playAgain">
                            <h4>Play Again?</h4>
                            <FormGroup row>
                                <Col id="yes">
                                    <Button type="submit" color="primary" onClick={this.playAgain}>
                                        Yes
                                    </Button>
                                </Col>
                                <Col id="no">
                                    <Link to={`/survey`}>
                                        <Button color="primary">
                                            No
                                        </Button>
                                    </Link>
                                </Col>
                            </FormGroup>
                        </Form>
                        {this.renderPlay(this.state.play_again)}
                        
                    </Container>
                </div>
            </div>
            </div>
        
      );
    }

  }

  export default GameOverPopup;