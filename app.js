const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);

const dbUrl = 'mongodb://localhost:27017/movie';

mongoose.connect(dbUrl);
console.log('MongoDB connection success!');

const app = express();

app.locals.moment = require('moment');

// view engine setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'movie',
  cookie: {
    //maxAge: 1000*60*30
  },
  store: new mongoStore({
    url: dbUrl,
    collection: 'sesssions'
  }),
  resave: true,
  saveUninitialized: true
}));

//pre handle user
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) {
    res.locals.message = "<div class='alert alert-danger' style='color: red;'>" + err + "</div>";
  }
  next();
});

require('./config/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
