const express = require("express");
const router = express.Router();
var connection = require('./database');

router.get("/", function(req, res, next) {
  var userName = req.query.userName; 
  console.log(req.query.userName)
  // res.render('rewards');

    // - 2 routes, one for Travel details, one for rewards

 //res.render('rewards', {title:'User Rewards', action:'list', data});
//   https://www.google.com/search?q=nodejs+pass+parameter+in+url&rlz=1C1CHBF_enUS944US944&oq=nodejs+pass+parameter+in+url&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDc5ODNqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:6675c23f,vid:6tbtYflLxAY
  connection.query("call getUserRewards(?)", [userName], function(err, data) {
    if (err) {
      throw err;
    }
    else {
      // Render the searchTable view and pass the title, action, and data "payload"
      res.render('reward', {title:'User Rewards', action:'list', data});
    }
  });
});

module.exports = router