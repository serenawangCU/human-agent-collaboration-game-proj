import React, {Component} from 'react';
import { Button, Form, FormGroup, Row, Input, Col, Alert } from 'reactstrap';
import { Redirect } from 'react-router';
import Constant from '../constants/constants';
import OfflinePopup from './OfflinePopupComponent';
import '../styles/Lobby.css';
import instructions from './Instructions.png';

const status = Constant.state;
export const names = []; // [playerName, partnerName]

class Lobby extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            ifRenamed: false,
            opponent: null,
            currentStatus: status.INITIAL,
            showPopup: false, 
            popupType: ''
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
                <Col md={{size:4, offset: 4}}>
                    <Alert color="info" type="text" id="ungaming">Ready! Waiting for your partner...</Alert>
                </Col>
            );
        }

        if (currentStatus === status.GAMING) {
            return <Redirect push to={`/tetris`} />;
        }
    }

    renderPair(name, currentStatus) {
        if (currentStatus === status.PAIRING) {
            return (
                <Col md={{size:4, offset: 4}}>
                    <Alert color="info" type="text" id="unpair">Waiting for match...</Alert>
                </Col>
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
                        {this.state.showPopup ? <OfflinePopup popupType = {this.state.popupType} /> : null }
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
                        {this.state.showPopup ? <OfflinePopup popupType = {this.state.popupType} /> : null }
                    </Form>
                );
            }
        }

        return <div></div>;
    }

    render(){
        console.log('lobby here');
        document.body.style.opacity = 1.0;
        return (
            <div className="row row-content">
                <div className="col-12">
                    <h3>What's your nickname?</h3>
                </div>
                <div className="col-12">
                    <Form onSubmit={this.handlePair}>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 3}}>
                                <Input type="text" id="nickname" name="nickname" required
                                    placeholder="Nickname"
                                    value={this.state.nickname}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 3}}>
                                <Button type="submit" color="primary" disabled={this.state.currentStatus !== status.INITIAL}>
                                    Pair
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    {this.renderPair(this.state.opponent, this.state.currentStatus)}
                    {this.renderStart(this.state.currentStatus)}
                </div>
                
                <Row id="info">
                    <Col id="instructions">
                        <p>
                            During the game, you and your partner will be assigned who's next by an AI. 
                            When it is not your turn, your screen will turn grey and you will not be able to
                            move the tetromino.
                            <br></br>
                            <br></br>
                            You will be able to control your tetromino by using the arrow keys. 
                        </p>
                    </Col>
                    <Col id="image">
                        <img src={instructions} alt="Up: Rotate, Left: Move Left, Right: Move Right, Down: Drop"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Lobby;