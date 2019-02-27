import React, { Component } from 'react';
import Home from './HomeComponent';
import TetrisGame from './TetrisGame';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
  }

  render() {
    const HomePage = () => {
      return (
        <Home socket={this.props.socket}/>
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
        {/* <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/game" component={TetrisGame} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch> */}
        <TetrisGame />
      </div>
    );
  }
}

export default Main;
