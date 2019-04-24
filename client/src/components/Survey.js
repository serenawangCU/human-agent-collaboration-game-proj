import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Container} from 'reactstrap';
import './Survey.css'

class Survey extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      alert("Submitted!");
      event.preventDefault();
      var data = {
        q1: document.getElementById('exampleSelect').value,
        q2: document.getElementById('exampleText').value
      }
      this.props.socket.emit('survey', data);
    }

    render() {
        document.body.style.opacity = 1.0;
        return(
          <Container>
            <h2>
              Thank you for playing!
            </h2>
            <p>
              Thank you for playing our game. We really appreciate you giving your time to further help us out!
            </p>

            {/* https://reactstrap.github.io/components/form/ */}
            <Form onSubmit={this.handleSubmit} id="survey">
              <FormGroup>
                  <Label for="exampleSelect">Would you want to play with the same person again?</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>Yes</option>
                    <option>No</option>
                  </Input>
              </FormGroup>
              <FormGroup>
                  <Label for="exampleText">Did you feel frustrated with the turn algorithm?</Label>
                  <Input type="textarea" name="text" id="exampleText" />
              </FormGroup>
              <FormGroup row id="buttons">
                <Col md={{size: 3, offset: 3}}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
                <Col md={{size: 3}}>
                  <Link to={`/lobby`}>
                    <Button color="primary">
                      Return Lobby
                    </Button>
                  </Link>
                </Col>
              </FormGroup>
            </Form>
          </Container>
        )

    }
 }

 export default Survey;