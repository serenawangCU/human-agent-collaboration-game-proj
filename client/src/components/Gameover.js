import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './Gameover.css';
import { Button, Form, FormGroup,Col, Container, Row, Label, Input} from 'reactstrap';
import CanvasComponent from './CanvasComponent';

//var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Gameover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play_again: false
        }

        
        
        // //this.goToHome = false;

        this.playAgain = this.playAgain.bind(this);
        // this.goToSurvey = this.goToSurvey.bind(this);

        this.props.socket.on('totalScoreDistributionReturn', (result) => {
            console.log('totalIndex: ' + result.index);
            console.log('totalCounts: ' + result.counts);
        })

        this.props.socket.emit('totalScoreDistribution', 15);
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
                        Individual Scores
                    </Col>
                    <Col>
                        <CanvasComponent socket={this.props.socket}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Team Scores
                    </Col>
                    <Col>
                        <CanvasComponent socket={this.props.socket}/>
                    </Col>
                </Row>
                <Form>
                    <FormGroup className = "row">
                        <Col md={12}>
                            <Label for="rating">Rate  (1 is least favorite, 5 is most favorite)</Label>
                        </Col>
                        
                        {/* <div class = "form-group position-centered">
                            <div class = "col-xs-3 "> */}
                            <Col md={{size:2, offset:5}}>
                                <Col md={{size:7, offset:3}}>
                                    <Input md={{size:4, offset:4}} type="select" name="rating" id="rating" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </Col>
                            </Col>
                            {/* </div>
                        </div> */}
                    </FormGroup>
                </Form>
                <Form id="playAgain">
                    <h5>Play Again?</h5>
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
