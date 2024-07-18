const mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'osartis'
});

connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
    console.log('Connected to the database as ID', connection.threadId);
});

module.exports = connection;