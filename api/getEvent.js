const express = require('express');
const router = express.Router();
const connection = require('../database/connection')

router.get('/', (req, res) => {
    $query = 'SELECT * FROM `events`';

    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log(err);
            return;
        }

        console.log("Query succesfully executed: ", rows);
        res.status(200).json(rows);
    });
});

module.exports = router;
