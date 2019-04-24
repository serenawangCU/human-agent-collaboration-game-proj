import React, {Component} from 'react';
import { Redirect } from 'react-router';
//import './Home.css';
import { Button, Form, FormGroup,Col, Container, Nav, NavItem, NavLink } from 'reactstrap';

class Gameover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: false
        }
        
        //this.goToHome = false;

        this.goToHome = this.goToHome.bind(this);
        this.goToSurvey = this.goToSurvey.bind(this);
    }

    //buttonPressed_home = false;
    goTohome(){
        this.setState({buttonPressed: true});
    }
    
    buttonPress_survey(){
        this.setState({buttonPressed: true});
    }
    
    goToSurvey_Home(buttonPressed){
        
        console.log("gotoLobby function");
        if (buttonPressed == true){
            return <Redirect push to={`/lobby`} />; //Doesn't work
        }
        else {
            console.log("button not pressed");
        }
    }

    render() {
        console.log(this.buttonPressed);
        return(
            <Container>
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/_fQtxKmgJC8" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
                
                <div className="info">
                    <p>
                        Welcome to collaborative Tetris! You will play a game of Tetris with a randomly chosen partner
                        while an AI will choose who will go next on every turn. 
                    </p>
                </div>
          

                <Form>
                    <FormGroup row>
                        <Col md={{size: 6, offset: 3}}>
                            <Button type="submit" color="primary" onClick={this.goToHome}>
                                Go to Homepage
                            </Button>
                            <Button type="submit" color="primary" onClick={this.goToSurvey}>
                                Go to Take Survey
                            </Button>
                        </Col>
                        <Col>
                            {this.goToHome(this.state.goToHome)}
                            {this.goToSurvey(this.state.goToSurvey)}
                        </Col>
                    </FormGroup>
                </Form>
                
            </Container>
            
              
        )
    }
 }

 export default Home;
