const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Movie = require('../app/controllers/movie');
const Comment = require('../app/controllers/comment');
const Category = require('../app/controllers/category');

module.exports = function(app) {
 //Index
 app.get('/', Index.index);

 //User
app.post('/user/signin', User.signin);
app.post('/user/signup', User.signup);
app.get('/signin', User.showSignin);
app.get('/signup', User.showSignup);
app.get('/logout', User.logout);
app.get('/admin/user/list', User.signinRequired, User.adminRequired,User.userlist);
app.delete('/admin/user/list', User.del);

//Movie
app.get('/movie/:id', Movie.detail);
app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.news);
app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired,Movie.update);
app.post('/admin/movie/new', User.signinRequired, User.adminRequired,Movie.save);
app.get('/admin/movie/list', User.signinRequired, User.adminRequired,Movie.list);
app.delete('/admin/movie/list', User.signinRequired, User.adminRequired,Movie.del);

//Comment
app.post('/user/comment',  User.signinRequired, Comment.save);

//category
app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.news);
app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save);
app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);

}


