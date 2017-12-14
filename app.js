var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var index = require('./routes/index');
// var users = require('./routes/users');
// var events = require('./routes/events');

var app = express();
var dburl = 'mongodb://admin:admin1@ds147799.mlab.com:47799/name_picker'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/events', events);
// app.use('/users', users);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});
// app.get('/events', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/html/events.html'));
// });
// app.get('/home', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/html/home.html'));
// });
// app.get('/profile', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/html/profile.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

MongoClient.connect(dburl, function(err, db){
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error: ', err)
  } else {
    console.log('Connection established to', dburl);
    db.close();
  }
});

// tar -zxvf mongodb-linux-x86_64-ubuntu1404-3.4.10.tgz

// cp -R -n mongodb-linux-x86_64-ubuntu1404-3.4.10 mongodb


