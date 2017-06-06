var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./models/movie');

mongoose.connect('mongodb://localhost:27017/movie');
console.log('MongoDB connection success!');

var app = express();

app.locals.moment = require('moment');

// view engine setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

/* GET users listing. */
app.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

// index page
app.get('/', (req, res) => {
  Movie.fetch((err, movies) => {
    if(err){
      console.log(err);
    }
    res.render('index', {
      title: '首页',
      movies: movies
    });
  })
});

// detail page
app.get('/movie/:id', (req, res) => {
  let id = req.params.id;

  Movie.findById(id, (err, movie) => {
    res.render('detail', {
      title: movie.title,
      movie: movie
    });
  });
});

// list page
app.get('/admin/list', (req, res) => {

  Movie.fetch((err, movies) => {
    if(err) {
      console.log(err);
    }
    res.render('list', {
      title: '列表页',
      movies: movies
    });
  });
});

// list page
app.get('/admin/movie', (req, res) => {
  res.render('admin', {
    title: '录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});

// admin post movie
app.post('/admin/movie/new', (req, res) => {
  const id = req.body.movie._id;
  const movieObj = req.body.movie;
  var _movie = null;
  if(id !== 'undefined' && id !== '') {
    Movie.findOneAndUpdate({_id: id}, movieObj, (err, movie) => {
      if(err) {
        console.log(err);
      }
      res.redirect('/admin/list');
    });
  }else{
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
    _movie.save(function(err, movie) {
      if(err) {
            console.log(err);
          }
          res.redirect('/movie/' + movie._id);
      });
    }
});

// admin update movie
app.get('/admin/update/:id', (req, res) => {
  const id = req.params.id;

  if(id) {
    Movie.findById(id, (err, movie) => {
      res.render('admin', {
        title: '后台更新页',
        movie: movie
      })
    });
  }
});

//admin delete movie
app.delete('/admin/list', (req, res) => {
  const id = req.query.id;
  if(id) {
    Movie.remove({_id: id}, function(err, movie) {
      if(err) {
        console.log(err);
      }else{
        res.json({success :1});
      }
    });
  }
});

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
