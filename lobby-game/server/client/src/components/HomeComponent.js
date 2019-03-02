import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
// import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

// function RenderCard({item}) {
//     return (
//         <Card>
//             <CardImg src={item.image} alt={item.name} />
//             <CardBody>
//                 <CardTitle>{item.name}</CardTitle>
//                 {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
//                 <CardText>{item.description}</CardText>
//             </CardBody>
//         </Card>
//     );
// } 
class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            opponent: null,
            pairing: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePair = this.handlePair.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.onOpponentPaired = this.onOpponentPaired.bind(this);
        this.props.socket.on('paired', (data) => {
            this.onOpponentPaired(data.userName);
        })
    }

    onOpponentPaired(name) {
        this.setState({opponent: name});
        this.setState({pairing: true});
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
        this.props.socket.emit('add_user', this.state.nickname);
    }

    handleConfirm(event) {
        event.preventDefault();
        window.location.href = "/Tetris/index.html";
    }

    renderForm(name, pairing) {
        if (name == null && !pairing) {
            return <div></div>
        }

        if (name == null && pairing) {
            return (
                <Col md={{size:4, offset: 4}}>
                    <Alert color="info" type="text" id="unpair">Waiting for pairing...</Alert>
                </Col>
            );
        }

        return (
            <Form>
                <FormGroup row>
                    <Col md={{size:4, offset: 4}}>
                        <Alert color="success" type="text" id="unpair">You've paired with {name}</Alert>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{size: 6, offset: 3}}>
                        {/* <a href="/Tetris/index.html"> */}
                        {/* link to tetris is not in used */}
                        <Link to={`/Tetris/index.html`} >
                            <Button type="submit" color="primary" onClick={this.handleConfirm}>
                                Start Game
                            </Button>
                        </Link>
                        {/* </a> */}
                    </Col>
                </FormGroup>
            </Form>
        );
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
                                <Button type="submit" color="primary" disabled={this.state.pairing}>
                                    Try Pair
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    {this.renderForm(this.state.opponent, this.state.pairing)}
                </div>
            </div>
        );
    }
}

export default Home;