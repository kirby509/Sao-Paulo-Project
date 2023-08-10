var express = require('express');
var router = express.Router();

/* GET users page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});


// // /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });

// // // 

// router.get('/', function(req, res) {
//   res.send('User List');
// });

// router.get('/new', function(req, res) {
//   res.send('Create User');
// });

// router 
//   .route("/:userId")
//   .get('/:userId', function(req, res) {
//   // req.params.userId
//   res.send(`Get User With ID  ${req.params.userId}`)
// })
// .put('/:userId', function(req, res) {
//   // req.params.userId
//   res.send(`Update User With ID  ${req.params.userId}`)
// })
// .delete('/:userId', function(req, res) {
//   // req.params.userId
//   res.send(`Delete User With ID ${req.params.userId}`)
// })

// module.exports = router;


