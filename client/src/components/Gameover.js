import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './Gameover.css';
import { Button, Form, FormGroup,Col, Container, Row} from 'reactstrap';
import CanvasComponent from './CanvasComponent';

class Gameover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play_again: false
        }

        
        
        // //this.goToHome = false;

        this.playAgain = this.playAgain.bind(this);
        // this.goToSurvey = this.goToSurvey.bind(this);
    }


    playAgain(){
        this.setState({play_again: true});
    }

    renderPlay(play_again){
        if (play_again) {
            document.getElementById("playAgain").remove()
            return (
                <Form id="playAgain">
                    <h4>Do you want to play with the same person?</h4>
                    <FormGroup row>
                        <Col id="yes">
                            <Link to={`/lobby`}>
                                <Button color="primary">
                                    Yes
                                </Button>
                            </Link>
                        </Col>
                        <Col id="no">
                            <Link to={`/lobby`}>
                                <Button color="primary">
                                    No
                                </Button>
                            </Link>
                        </Col>
                    </FormGroup>
                </Form>
            )
        }
    }

    render() {
        document.body.style.opacity = 1.0;
        return(
            <Container>
                <h3>Game Over</h3>
                <Row>
                    <Col>
                        Scores
                    </Col>
                    <Col>
                        <CanvasComponent socket={this.props.socket}/>
                    </Col>
                </Row>
          

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
            
              
        )
    }
 }

 export default Gameover;
