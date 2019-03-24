import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

class App extends Component {
  state = {users: []}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main socket={this.props.socket}/>
          </div>
        </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
