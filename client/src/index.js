import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import openSocket from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
require('./styles/style.scss');

const socket = openSocket("http://localhost:8000/"); //for local
<<<<<<< HEAD
// const socket = openSocket(); //for heroku
=======
//const socket = openSocket(); //for heroku
>>>>>>> 0bd41dfd4afca0a2b594c5999f19c5003d86ad50
console.log("React Client Open Socket");

ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
