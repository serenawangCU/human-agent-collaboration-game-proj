var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const mongoose = require('mongoose');

//MongoDB Connection URL
const url = 'mongodb+srv://TetrisUser:cs5150TetrisDB@cluster0-bucun.mongodb.net/test?retryWrites=true';
const connect = mongoose.connect(url, {
  useNewUrlParser: true
});

connect.then((db) => {
  console.log("Connected correctly to MongoDB server");
}, (err) => {console.log(err);});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

//UNUSED CODE TO BE DELETED:
app.use('/', indexRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get('/lobby', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
