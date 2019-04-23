import React, { Component } from 'react';
import Row1 from './Row'
import Next from './Next'
import Shapes from "./Shapes";
import './GameGrid.css'
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import { names } from './LobbyComponent';

// const GameGrid = () => (
//     <h1>This is a game grid</h1>
// )

class GameGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            field: [],
            nextFigure: '',
            nextFigureIndex: 0,
            score: 0,
            fieldWidth: 10,
            fieldHeight: 15,
            figures: Shapes,
            interval: null,
            speed: 150,
            defaultSpeed: 150,
            fastSpeed: 10,
            gameOver: false,
            rotate: false,
            stepCounter: 0,
            direction: "",
            currentPlayer : '',
            nextPlayer : '',
            playerId: this.props.socket.id,
            partnerOnline: true
        }

        this.gameMove = {
            left: false,
            right: false,
            up: false,
            down: false
        }

        //Listen for the next block type from the server
        this.props.socket.on('game_contents', (data) => {
            //console.log('game_contents');
            //console.log(data.gameField);
            this.setState({field : data.gameField});
        });

    }

    componentDidMount() {    
        //this.initFigures();
        document.addEventListener('keydown', this.keydownHandler.bind(this), false);
        this.updateScore();
        this.updatePlayerData();
        this.gameStatus();
    }

    componentWillUnmount() {
        document.addEventListener('keydown', this.keydownHandler.bind(this), false);
       
    }
    updateScore() {
        this.props.socket.on('score', (data) => {
            this.setState({score: data.score});
        });
    }

    gameStatus() {
        
        this.props.socket.on('game_over',() => {
            this.setState({gameOver: true});
        });
        this.props.socket.on('leaving',() => {
            document.body.style.opacity = 1.0;
            this.setState({partnerOnline: false});
            this.props.socket.off('score');
            this.props.socket.off('game_over');
            this.props.socket.off('player_block_data');
            this.props.socket.off('game_contents');
        });
    }
    
    updatePlayerData() {
        let figures = this.state.figures;
        this.props.socket.on('player_block_data', (data) => {
            this.setState({  
                nextFigure: figures[data.nextBlockIndex].path,
                currentPlayer : data.currentPlayer,
                nextPlayer : data.nextPlayer
            });
        });
    }


    keydownHandler(e) {
        //check if player is current player
        if (this.state.playerId === this.state.currentPlayer) {

            switch(e.keyCode){
                //left
                case 37: this.setState({direction: "left"});
                break;
                
                //right
                case 39: this.setState({direction: "right"});
                break;
                
                //up
                case 38: this.setState({direction: "up"});
                break;

                //down
                case 40: this.setState({direction: "down"});
                break;

                default: break;
                
            }
            //console.log(this.state.direction);
            this.props.socket.emit('move', this.state.direction);
        }
    }


    // reactstrap, adjust the place of grid
    render() {
        if (this.state.currentPlayer === this.state.playerId || !this.state.partnerOnline || this.state.gameOver) {
            document.body.style.opacity = 1.0;
        } else {
            document.body.style.opacity = 0.5;
        }

    
        return (
            <Container>
                
                <div className="wrapper">
                    <Row>
                        <Col xs="auto">.col-auto
                            <div className= "field">  
                                {this.state.field.map((row, i) =>
                                    <Row1 key={i} row={row}/>
                                )} 
                            </div>
                        </Col>
                        <Col xs="auto">.col-auto
                            <div className="aside">
                                <div className="status">{this.state.gameOver ? 'Game over' : 'Game start'}</div>
                                <div className="score">
                                    Score:<br />
                                    {this.state.score}<br />
                                </div>
                                
                                <div className="player">
                                    Current Player: <br />
                                    {this.state.currentPlayer === this.state.playerId ? names[0] : names[1]}<br />
                                </div>
                                <div className="player">
                                    Next Player:<br />
                                    {this.state.nextPlayer === this.state.playerId ? names[0] : names[1]}<br />
                                </div>
                                <div className="player">
                                    Name:<br />
                                    {names[0]}<br />
                                </div>
                                <Next className="next" figure={this.state.nextFigure} shift={this.state.fieldWidth / 2 - 2}/>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            </Container>
        )
    }

}

export default GameGrid;