import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { Redirect } from 'react-router';
import Constant from '../constants/constants';
import Popup from './Popup';

const status = Constant.state;
export const names = []; // [playerName, partnerName]

class Home extends Component {

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
                    <Alert color="info" type="text" id="unpair">Waiting for pairing...</Alert>
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
                        {this.state.showPopup ? <Popup popupType = {this.state.popupType} /> : null }
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
                        {this.state.showPopup ? <Popup popupType = {this.state.popupType} /> : null }
                    </Form>
                );
            }
        }

        return <div></div>;
    }

    render(){
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
                                <Input type="text" id="nickname" name="nickname"
                                    placeholder="Nickname"
                                    value={this.state.nickname}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 6, offset: 3}}>
                                <Button type="submit" color="primary" disabled={this.state.currentStatus !== status.INITIAL}>
                                    Try Pair
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    {this.renderPair(this.state.opponent, this.state.currentStatus)}
                    {this.renderStart(this.state.currentStatus)}
                </div>
            </div>
        );
    }
}

export default Home;