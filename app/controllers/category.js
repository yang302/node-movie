const Category = require('../models/category'); 

// admin new movie page
exports.news = (req, res) =>  {
  res.render('category_admin',  {
    title: '后台分类录入页',
    category: {}
  }); 
}; 

// admin post category
exports.save = (req, res) =>  {
    const _category = req.body.category; 
    const category = new Category(_category);
    console.log(_category);
    category.save(function(err, category) {
        if (err) {
            console.log(err); 
        }
        
        res.redirect('/admin/category/list'); 
    }); 
}

// admin categorylist
exports.list = (req, res) => {

  Category.fetch((err, categories) =>  {
    if (err) {
      console.log(err); 
    }
    res.render('categorylist',  {
      title: '分类列表页', 
      categories: categories
    }); 
  }); 
}; 

