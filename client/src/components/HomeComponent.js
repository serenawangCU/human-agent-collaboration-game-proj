import React, {Component} from 'react';
import { Redirect } from 'react-router';
import './Home.css';
import { Button, Form, FormGroup,Col, Container, Nav, NavItem, NavLink } from 'reactstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        
        this.buttonPressed = false;

        this.buttonPress = this.buttonPress.bind(this);
        this.goToLobby = this.goToLobby.bind(this);
    }

    goToLobby(){
        if (this.buttonPressed) {
            console.log("Called");
            this.push(`/lobby`); //Doesn't work
        }
        
    }

    buttonPress() {
        this.buttonPressed = true;
        console.log(this.buttonPressed);
        this.goToLobby()
    }

    

    render() {
        console.log(this.buttonPressed);
        return(
            <Container>
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/_fQtxKmgJC8" allow="accelerometer; encrypted-media; gyroscope" allowFullScreen>
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
                            <Button color="primary" onClick={this.buttonPress}>
                                Enter Lobby
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                {/* <Nav pills>
                    <NavItem>
                        <NavLink to="/lobby">Enter Lobby</NavLink>
                    </NavItem>
                </Nav> */}
            </Container>
            
        )
    }
 }

 export default Home;