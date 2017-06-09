const User = require('../models/user');

//signin page
exports.showSignin = (req, res) =>  {
  res.render('signin',  {title:'登录页面'}); 
}; 

//signup page
exports.showSignup = (req, res) =>  {
  res.render('signup',  {title:'注册页面'}); 
}; 

//admin signup post
exports.signup = (req, res) =>  {
  const _name = req.body.uname; 
  const _password = req.body.upassword; 
  
  User.findOne( {name:_name}, function(err, user) {
    if (err) {
      res.sendStatus(500); 
      req.session.error = '网络异常错误！'; 
    }else if (user) {
      req.session.error = '用户名已存在'; 
      res.sendStatus(500); 
    }else {
      const user = new User( {
        name:_name, 
        password:_password
      }); 
      user.save(function (err, user) {
        if (err) {
          res.sendStatus(500); 
          console.log(err); 
        }else {
          req.session.error = '用户名创建成功！'; 
          res.sendStatus(200); 
        }
      }); 
    }
  }); 
}; 

//admin signin post
exports.signin = (req, res) =>  {
  const name = req.body.uname; 
  const password = req.body.upassword; 
  
  User.findOne( {name:name}, function(err, user) {
    if (err) {
      res.sendStatus(500); 
      console.log(err); 
    }else if ( ! user) {
      req.session.error = '用户名不存在'; 
      res.sendStatus(404); 
    }else {
      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          console.log(err); 
        }

        if (isMatch) {
          req.session.user = user; 
          req.session.error = '登录成功'; 
          res.sendStatus(200); 
        }else {
          req.session.error = '密码错误'; 
          res.sendStatus(404); 
        }
      }); 
    }
  }); 
}; 

// admin userlist page
exports.userlist = (req, res) => {

  User.fetch((err, users) =>  {
    if (err) {
      console.log(err); 
    }
    res.render('userlist',  {
      title:'用户列表页', 
      users:users
    }); 
  }); 
}; 

// midware for user
exports.signinRequired = (req, res, next) => {
  const user = req.session.user;
  if(!user) {
    return res.redirect('/signin');
  }
  next();
}; 

exports.adminRequired = (req, res, next) => {
  const user = req.session.user;
  if(user.role <= 10) {
    return res.redirect('/signin');
  }
  next();
}; 

//admin logout
exports.logout = (req, res) =>  {
  delete req.session.user; 
  res.redirect('/'); 
}; 

//delete 
exports.del = (req, res) =>  {
  const id = req.query.id; 
  if (id) {
    User.remove( {_id:id}, function(err, user) {
      if (err) {
        console.log(err); 
      }else {
        res.json( {success:1}); 
      }
    }); 
  }
}; 