
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var connection = require('./routes/database');

// Database connection is in the database router now.
connection.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

app.get('/success', function(req, res) {
  res.send({'message': 'Success!'});
})

app.get('/lookup', function(req, res) {
  res.render('index', { title: 'Home' });
});

//this code is executed when a user clicks the form submit button
app.post('/create', function(req, res) {
  console.log('Insert Command')
  var email = req.body.email;
  var password = req.body.password;
  var sql = `INSERT INTO Riders (email, password) VALUES ('${email}','${password}')`;

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });
});

app.post('/update', function(req, res) {
  console.log('Update Command')
  var updateUserID = req.body.updateUserID;
  var newemail = req.body.newemail;
  var sqlupdate = `UPDATE Riders SET email = '${newemail}' WHERE user_id = ${updateUserID};`;

console.log(sqlupdate);
  connection.query(sqlupdate, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });

});

app.post('/delete', function(req, res) {
  console.log('Delete Command')
  var deleteUserID = req.body.deleteUserID;
  var sqldel = `DELETE FROM Riders WHERE user_id = ${deleteUserID}`;

console.log(sqldel);
  connection.query(sqldel, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });

});

app.post('/saveTrip', function(req, res) {
  console.log('Save Trip')
  var userName = req.body.tripUserName;
  var tripID = req.body.tripID;
  console.log(req.body.tripUserName)
  console.log(req.body.tripID)  
  connection.query("call rewardUpdate(?,?)", [userName, tripID], function(err, data) {
      if (err) {
        throw err;
      }
      else {
        res.redirect('/success');
      }
    });
  })


// These two lines make the router available in this file
const searchRouter = require("./routes/searchTable");
app.use('/searchTable', searchRouter)

// This bit "catches" the search action from the form on index.ejs
app.post('/search', function(req, res) {
  console.log('Search Term')
  var searchTerm = req.body.searchTerm; // Set the searchTerm param
    res.redirect('/searchTable/?searchTerm=' + searchTerm); // send param by url
    // https://stackoverflow.com/questions/68062186/how-to-send-additional-data-along-with-res-redirect-in-nodejs-express
  })

// These two lines make the router available in this file
const lookupRouter = require("./routes/lookupTable");
app.use('/lookupTable', lookupRouter)

// This bit "catches" the search action from the form on index.ejs
app.post('/lookup', function(req, res) {
  console.log('Lookup Term')
  var routeType = req.body.routeType;
  var stopId = req.body.stopId;
  var tripDate = req.body.tripDate;  // Set the searchTerm param
  console.log(req.body.routeType)
  console.log(req.body.stopId)
  console.log(req.body.tripDate)
    res.redirect('/lookupTable/?routeType=' + routeType + '&stopId=' + stopId + '&tripDate=' + tripDate.toString()); // send param by url
    // https://stackoverflow.com/questions/68062186/how-to-send-additional-data-along-with-res-redirect-in-node>
  })

  // These two lines make the router available in this file
const detailRouter = require("./routes/userDetails");
app.use('/userDetails', detailRouter)

// This bit "catches" the search action from the form on index.ejs
app.post('/userdata', function(req, res) {
  console.log('Data User Name')
  var userName = req.body.userName;
  console.log(req.body.userName)
    res.redirect('/userDetails/?userName=' + userName); // send param by url
    // https://stackoverflow.com/questions/68062186/how-to-send-additional-data-along-with-res-redirect-in-node>
  })

  // These two lines make the router available in this file
  const rewardRouter = require("./routes/reward");
  app.use('/reward', rewardRouter)

  // This bit "catches" the search action from the form on index.ejs
app.post('/reward', function(req, res) {
  console.log('Reward User Name')
  var userName = req.body.userName;
  console.log(req.body.userName)
    res.redirect('reward/?userName=' + userName); // send param by url
    // https://stackoverflow.com/questions/68062186/how-to-send-additional-data-along-with-res-redirect-in-node>
  })



app.listen(80, function () {
    console.log('Node app is running on port 80');
});
