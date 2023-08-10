const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: '34.66.230.77',
    user: 'root',
    password: 'dataBased',
    database: 'brazilianTrip'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully!');
	}
});

module.exports = connection;