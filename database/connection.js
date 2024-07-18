const mysql = require('mysql2');
require('dotenv').config()

var connection = mysql.createConnection({
    host     : process.env.DB_SERVER,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
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