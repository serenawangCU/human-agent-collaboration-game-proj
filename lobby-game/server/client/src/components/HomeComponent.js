import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { Redirect } from 'react-router';
import Constant from '../constants/constants';

const state = Constant.state;

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            opponent: null,
            currentState: state.INITIAL
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePair = this.handlePair.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.onOpponentPaired = this.onOpponentPaired.bind(this);
        this.props.socket.on('paired', (data) => {
            if (data.result == true) {
                this.onOpponentPaired(data.userName);
            }
        });

        this.props.socket.on('gaming', (data) => {
            console.log('gaming');

            if (data.result == true) {
                this.setState({currentState: state.GAMING});
            }
        });
    }

    onOpponentPaired(name) {
        this.setState({opponent: name});
        this.setState({currentState: state.PAIRED});
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
        this.setState({currentState: state.PAIRING});
        this.props.socket.emit('add_user', this.state.nickname);
    }

    handleConfirm(event) {
        this.setState({currentState: state.READY});
        this.props.socket.emit('ready');
    }

    renderStart(currentState) {
        if (currentState == state.READY) {
            return (
                <Col md={{size:4, offset: 4}}>
                    <Alert color="info" type="text" id="ungaming">Waiting for your opponent...</Alert>
                </Col>
            );
        }

        if (currentState == state.GAMING) {
            return <Redirect push to={`/tetris`} />;
        }
    }

    renderPair(name, currentState) {
        if (currentState == state.PAIRING) {
            return (
                <Col md={{size:4, offset: 4}}>
                    <Alert color="info" type="text" id="unpair">Waiting for pairing...</Alert>
                </Col>
            );
        }

        if (currentState == state.PAIRED) {
            return (
                <Form>
                    <FormGroup row>
                        <Col md={{size:4, offset: 4}}>
                            <Alert color="success" type="text" id="unpair">You've paired with {name}</Alert>
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

        return <div></div>;
    }

    render(){
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
                                <Button type="submit" color="primary" disabled={this.state.currentState != state.INITIAL}>
                                    Try Pair
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    {this.renderPair(this.state.opponent, this.state.currentState)}
                    {this.renderStart(this.state.currentState)}
                </div>
            </div>
        );
    }
}

export default Home;