import React, {Component} from 'react';
import { Container, Button, Form, FormGroup, Row, Input, Col, Alert, FormFeedback } from 'reactstrap';
import { Redirect } from 'react-router';
import Constant from '../constants/constants';
import OfflinePopup from './OfflinePopupComponent';
import '../styles/Lobby.css';
import instructions from './Instructions.png';

const status = Constant.state;
export const names = []; // [playerName, partnerName]

/**
 * Lobby Component for the rendering of the lobby page
 */
class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            ifRenamed: false,
            opponent: null,
            currentStatus: status.INITIAL,
            showPopup: false, 
            popupType: '',
            touched: {
                nickname: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePair = this.handlePair.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.onOpponentPaired = this.onOpponentPaired.bind(this);
        
        this.props.socket.on('paired', (data) => {
            if (data.result === true) {
                this.onOpponentPaired(data.userName);
                names.push(data.userName)
            }
        });

        this.props.socket.on('rename', (data) => {
            this.state.ifRenamed = true;
            this.state.nickname = data;
            names[0] = data;
        });

        this.props.socket.on('gaming', (data) => {
            console.log('gaming');

            if (data.result === true) {
                this.setState({currentStatus: status.GAMING});
            }
        });

        this.props.socket.on('leaving',() => {
            this.setState({ showPopup: true, popupType: 'offline'});
        });
        names.length = 0;
    }

    componentWillUnmount() {
        this.props.socket.off('paired');
        this.props.socket.off('gaming');
        this.props.socket.off('rename');
    }

    onOpponentPaired(name) {
        this.setState({opponent: name});
        this.setState({currentStatus: status.PAIRED});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handlePair(event) {
        event.preventDefault();
        this.setState({currentStatus: status.PAIRING});
        this.props.socket.emit('add_user', this.state.nickname);
        names.unshift(this.state.nickname);
    }

    handleConfirm(event) {
        this.setState({currentStatus: status.READY});
        this.props.socket.emit('ready');
    }

    renderStart(currentStatus) {
        if (currentStatus === status.READY) {
            return (
                <div>
                    <Col md={{size:4, offset: 4}}>
                        <Alert color="info" type="text" id="ungaming">Ready! Waiting for your partner...</Alert>
                    </Col>
                </div>
            );
        }

        if (currentStatus === status.GAMING) {
            return <Redirect push to={`/tetris`} />;
        } 

        if (currentStatus === status.INITIAL) {
        }
    }

    renderPair(name, currentStatus) {
        if (currentStatus === status.PAIRING) {
            return (
                <div>
                    <Col md={{size:4, offset: 4}}>
                        <Alert color="info" type="text" id="unpair">Waiting for match...</Alert>
                    </Col>
                </div>
            );
        }

        if (currentStatus === status.PAIRED) {
            if (this.state.ifRenamed === false) {
                return (
                    <Form>
                        <FormGroup row>
                            <Col md={{size:4, offset: 4}}>
                                <Alert color="success" type="text" id="unpair">You've been paired with {name}</Alert>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 3}}>
                                <Button type="submit" color="primary" onClick={this.handleConfirm}>
                                    Start Game
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                );
            } else {
                return (
                    <Form>
                        <FormGroup row>
                            <Col md={{size:4, offset: 4}}>
                                <Alert color="success" type="text" id="unpair">
                                You're renamed as {this.state.nickname} because of duplicate names. 
                                You've been paired with {name}</Alert>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 3}}>
                                <Button type="submit" color="primary" onClick={this.handleConfirm}>
                                    Start Game
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                );
            }
        }

        return <div></div>;
    }


    validate(nickname) {

        const errors = {
            nickname: ''
        };

        if (nickname.length < 3)
            errors.nickname = 'Nick Name should be >= 3 characters';
        else if (nickname.length > 20)
            errors.nickname = 'Nick Name should be <= 20 characters';

        return errors;
    }

    render(){
        const errors = this.validate(this.state.nickname);
        //console.log('lobby here');
        //console.log('names: ' + names);
        document.body.style.opacity = 1.0;
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>What's your nickname?</h3>
                    </Col>
                </Row>
                <Form onSubmit={this.handlePair}>
                    <FormGroup row>
                        <Col md={{size: 6, offset: 3}}>
                            <Input type="text" id="nickname" name="nickname"
                                placeholder="Nickname"
                                value={this.state.nickname}
                                valid = {errors.nickname === ''}
                                invalid = {errors.nickname !== ''}
                                onChange={this.handleInputChange} />
                            <FormFeedback>
                                {errors.nickname}
                            </FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{size: 6, offset: 3}}>
                            <Button type="submit" color="primary" disabled={errors.nickname !== '' || this.state.currentStatus !== status.INITIAL}>
                                Pair
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                {this.renderPair(this.state.opponent, this.state.currentStatus)}
                {this.renderStart(this.state.currentStatus)}
                <Instruct />
                {this.state.showPopup ? <OfflinePopup popupType = {this.state.popupType} /> : null }
            </Container>
        );
    }
}

class Instruct extends Component {
    render() {
        return (
            <div>
                <Row id="info">
                    <Col md={{size: 6}}>
                        <p>
                            During the game, you and your partner will be assigned who's next by an AI. 
                            When it is not your turn, your screen will turn grey and you will not be able to
                            move the tetromino.
                            <br></br>
                            <br></br>
                            You will be able to control your tetromino by using the arrow keys. 
                        </p>
                    </Col>
                    <Col md={{size: 6}}>
                        <img src={instructions} alt="Up: Rotate, Left: Move Left, Right: Move Right, Down: Drop"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Lobby;