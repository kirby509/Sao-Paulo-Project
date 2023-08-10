const express = require("express");
const router = express.Router();
var connection = require('./database');

router.get("/", function(req, res, next) {
  var routeType = req.query.routeType;
  var stopId = req.query.stopId;
  var tripDate = req.query.tripDate; //This pulls the searchTerm param from the URL
  console.log(req.query.routeType)
  console.log(req.query.stopId)
  console.log(req.query.tripDate)
  // https://www.google.com/search?q=nodejs+pass+parameter+in+url&rlz=1C1CHBF_enUS944US944&oq=nodejs+pass+parameter+in+url&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDc5ODNqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:6675c23f,vid:6tbtYflLxAY
  connection.query("call lookup(?,?,?)", [routeType, stopId, tripDate], function(err, data) {
    if (err) {
      throw err;
    }
    else {
      // Render the searchTable view and pass the title, action, and data "payload"
      res.render('lookupTable', {title:'Routes Today', action:'list', data});
    }
  });
});

module.exports = router