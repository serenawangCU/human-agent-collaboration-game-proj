import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { Button, Col, Container, Row } from 'reactstrap';

/**
 * Home Component for the rendering of the home page
 */
class Home extends Component {

    constructor(props) {
        super(props);
        
        //this.buttonPressed = false;
    }

    render() {
        console.log(this.buttonPressed);
        return(
            <Container>
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/_fQtxKmgJC8" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
                
                <Row>
                    <p>
                        Welcome to collaborative Tetris! You will play a game of Tetris with a randomly chosen partner
                        while an AI will choose who will go next on every turn. 
                    </p>
                </Row>
          

                <Row>
                    <Col md={{size: 6, offset: 3}}>
                        <Link to={`/lobby`}>
                            <Button type="submit" color="primary">
                                Enter Lobby
                            </Button>
                        </Link>
                    </Col>
                </Row>
                
            </Container>
            
              
        )
    }
 }

 export default Home;