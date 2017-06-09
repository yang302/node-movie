const Movie = require('../models/movie'); 
const Category = require('../models/category'); 

// index page
exports.index = (req, res) =>  {

  Category.find({})
  .populate({path: 'movies', options: {limit: 5}})
  .exec(function(err, categories) {
      if (err) {
        console.log(err); 
      }
      res.render('index',  {
        title: '首页', 
        categories: categories
      }); 
    });

  
} 