const Movie = require('../models/movie'); 
const Comment = require('../models/comment'); 

// detail page
exports.detail = (req, res) =>  {
  let id = req.params.id; 

  Movie.findById(id, (err, movie) =>  {
    Comment.find({movie: id})
    .populate('from', 'name')
    .populate('reply.from reply.to', 'name')
    .exec((err, comments) => {
      //console.log(comments);
       res.render('detail',  {
        title: '详情页-' + movie.title, 
        movie: movie,
        comments: comments
      }); 
    });
  }); 
}; 

// list page
exports.list = (req, res) =>  {

  Movie.fetch((err, movies) =>  {
    if (err) {
      console.log(err); 
    }
    res.render('list',  {
      title:'列表页', 
      movies:movies
    }); 
  }); 
}; 

// admin new movie page
exports.news = (req, res) =>  {
  res.render('admin',  {
    title:'录入页', 
    movie: {
      title:'', 
      doctor:'', 
      country:'', 
      year:'', 
      poster:'', 
      flash:'', 
      summary:'', 
      language:''
    }
  }); 
}; 

// admin post movie
exports.save = (req, res) =>  {
  const id = req.body.movie._id; 
  const movieObj = req.body.movie; 
  var _movie = null; 
  if (id !== 'undefined' && id !== '') {
    Movie.findOneAndUpdate({_id:id}, movieObj, function(err, movie) {
      if (err) {
        console.log(err); 
      }
      res.redirect('/admin/movie/list'); 
    }); 
  }else {
    _movie = new Movie( {
      doctor:movieObj.doctor, 
      title:movieObj.title, 
      country:movieObj.country, 
      language:movieObj.language, 
      year:movieObj.year, 
      poster:movieObj.poster, 
      summary:movieObj.summary, 
      flash:movieObj.flash
    }); 
    _movie.save(function(err, movie) {
      if (err) {
            console.log(err); 
          }
          res.redirect('/movie/' + movie._id); 
      }); 
    }
}; 

// admin update movie
exports.update = (req, res) =>  {
  const id = req.params.id; 

  if (id) {
    Movie.findById(id, (err, movie) =>  {
      res.render('admin',  {
        title: '后台更新页', 
        movie: movie
      })
    }); 
  }
}; 

//admin delete movie
exports.del = (req, res) =>  {
  const id = req.query.id; 
  if (id) {
    Movie.remove( {_id:id}, function(err, movie) {
      if (err) {
        console.log(err); 
      }else {
        res.json( {success:1}); 
      }
    }); 
  }
}; 