import React, { Component } from 'react';
import Home from './HomeComponent';
import Lobby from './LobbyComponent';
// import NewTetris from '../newSrc/containers'
import Tetris from './Tetris';
import Header from './HeaderComponent';

// add survey
import Survey from './Survey'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
const reload = () => window.location.reload();

class Main extends Component {

  constructor(props) {
    super(props);

  }

  // onDishSelect(dishId) {
  //   this.setState({selectedDish: dishId});
  // }

  render() {
    const HomePage = () => {
      return (
        <Home socket={this.props.socket}/>
      );
    }

    const LobbyPage = () => {
      return (
        <Lobby socket={this.props.socket}/>
      );
    }

    const TetrisPage = () => {
      return (
        <Tetris socket={this.props.socket}/>
      );
    }

    const SurveyPage = () => {
      return (
        <Survey socket={this.props.socket}/>
      );
    }

    // const DishWithId = ({match}) => {
    //   return(
    //     <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId))[0]}
    //     comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))} />
    //   );
    // }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/lobby" component={LobbyPage} />
          <Route exact path="/tetris" component={TetrisPage} />
          <Route exact path="/survey" component={SurveyPage}/>
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Main;
