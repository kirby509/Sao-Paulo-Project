var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	
	database.query(stopLookup, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('searchStop', {title:'Results', action:'list', sampleData:data});
		}

	});

});

module.exports = router;
