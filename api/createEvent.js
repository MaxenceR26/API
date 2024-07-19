const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { id, event_date, event_title } = req.body; // Assurez-vous que ces champs sont envoyés dans le corps de la requête

    if (!id || !event_date || !event_title) {
        res.status(400).send("Missing required fields");
        return;
    }

    const query = 'INSERT INTO events (id, event_date, event_title) VALUES (?, ?, ?)';

    connection.query(query, [id, event_date, event_title], function(err, results) {
        if (err) {
            console.error("An error occurred performing the query:", err);
            res.status(500).send("An error occurred performing the query.");
            return;
        }

        console.log("Query successfully executed:", results);
        res.status(200).send("Event created successfully");
    });
});

router.post('/', (req, res) => {
    const { id, event_date, event_title } = req.body; // Assurez-vous que ces champs sont envoyés dans le corps de la requête

    if (!id || !event_date || !event_title) {
        res.status(400).send("Missing required fields");
        return;
    }

    const query = 'INSERT INTO events (id, event_date, event_title) VALUES (?, ?, ?)';

    connection.query(query, [id, event_date, event_title], function(err, results) {
        if (err) {
            console.error("An error occurred performing the query:", err);
            res.status(500).send("An error occurred performing the query.");
            return;
        }

        console.log("Query successfully executed:", results);
        res.status(200).send("Event created successfully");
    });
});

module.exports = router;
