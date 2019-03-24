import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import openSocket from 'socket.io-client';
import io from '../../socket.io';
import { unregister } from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
require('./styles/style.scss');

// const socket = openSocket('https://immense-anchorage-61325.herokuapp.com:5000');
const socket = io();
console.log(socket);
console.log("here!");

ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
