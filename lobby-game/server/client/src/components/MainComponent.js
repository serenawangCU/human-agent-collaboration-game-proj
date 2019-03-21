import React, { Component } from 'react';
import Home from './HomeComponent';
// import NewTetris from '../newSrc/containers'
import Tetris from './Tetris';
import Header from './HeaderComponent';
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

    const TetrisPage = () => {
      return (
        <Tetris socket={this.props.socket}/>
        // <NewTetris/>
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
          <Route exact path="/tetris" component={TetrisPage} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default Main;
