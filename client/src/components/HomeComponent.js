import React, {Component} from 'react';
import { Redirect } from 'react-router';
import './Home.css';
import { Button, Form, FormGroup,Col, Container } from 'reactstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: false
        }
        
        //this.buttonPressed = false;

        this.goToLobby = this.goToLobby.bind(this);
        this.buttonPress = this.buttonPress.bind(this);
    }
<<<<<<< HEAD
    //buttonPressed = false;
    buttonPress(){
        this.setState({buttonPressed: true});
    }
    goToLobby(buttonPressed){
        
        console.log("gotoLobby function");
        if (buttonPressed == true){
            return <Redirect push to={`/lobby`} />; //Doesn't work
        }
        else {
            console.log("button not pressed");
        }
=======

    goToLobby(){
        console.log('to_lobby');
        return <Redirect push to={`/lobby`} />; //Doesn't work
>>>>>>> c15102c87932fba0e0c2e5a709773afc877fd4c2
    }

    render() {
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
                            <Button type="submit" color="primary" onClick={this.buttonPress}>
                                Enter Lobby
                            </Button>
                        </Col>
                        <Col>
                            {this.goToLobby(this.state.buttonPressed)}
                        </Col>
                    </FormGroup>
                </Form>
                
            </Container>
            
              
        )
    }
 }

 export default Home;