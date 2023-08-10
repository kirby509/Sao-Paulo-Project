var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// /* GET registration page */
// router.get('/register', function(req, res, next) {
//   res.render('register', { title: 'New User' });
// });

// /* GET registration page */
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Welcome Back!' });
// });


// module.exports = router;
