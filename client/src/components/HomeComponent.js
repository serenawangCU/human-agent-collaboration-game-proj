import React, {Component} from 'react';
import { Redirect } from 'react-router';
import './Home.css';
import { Button, Form, FormGroup,Col, Container } from 'reactstrap';

class Home extends Component {

    constructor(props) {
        super(props);

        this.goToLobby = this.goToLobby.bind(this);
    }

    goToLobby(){
        return <Redirect push to={`/lobby`} />; //Doesn't work
    }

    render() {
        return(
            <Container>
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/_fQtxKmgJC8" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
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
                            <Button type="submit" color="primary" onClick={this.goToLobby}>
                                Enter Lobby
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
 }

 export default Home;