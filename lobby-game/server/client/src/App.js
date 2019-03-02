import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import './App.css';

class App extends Component {
  state = {users: []}

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        {/* <HashRouter> */}
          <div className="App">
            <Main socket={this.props.socket}/>
          </div>
        {/* </HashRouter> */}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
