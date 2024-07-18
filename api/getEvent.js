const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

// Route GET pour obtenir tous les événements
router.get('/', (req, res) => {
    const query = 'SELECT * FROM events';

    connection.query(query, function(err, rows, fields) {
        if (err) {
            console.error("Une erreur est survenue:", err);
            res.status(500).send("Une erreur s’est produite lors de l’exécution de la requête.");
            return;
        }

        console.log("Requête exécutée avec succès:", rows);
        res.status(200).json(rows);
    });
});

// Route GET pour obtenir un évènement avec un ID en particulier
router.get('/:id', (req, res) => {
    const id = req.params.id;;

    const query = 'SELECT `event_title` FROM `events` WHERE `id` = ?';

    connection.query(query, [id], function(err, results) {
        if (err) {
            console.log('erreur +> ', err)
        }
        console.log("Requête exécutée avec succès:", results);
        res.status(200).send(results);
    })
    console.log("req.params.id:", req.params.id);
});

// Route POST pour créer un événement
router.post('/createEvent', (req, res) => {
    const { event_date, event_title } = req.body;

    if (!event_date || !event_title) {
        res.status(400).send("Champs obligatoires manquants");
        return;
    }

    const query = 'INSERT INTO events (event_date, event_title) VALUES (?, ?)';

    connection.query(query, [event_date, event_title], function(err, results, fields) {
        if (err) {
            console.error("Une erreur est survenue:", err);
            res.status(500).send("Une erreur s’est produite lors de l’exécution de la requête.");
            return;
        }

        console.log("Requête exécutée avec succès:", results);
        res.status(200).send("Événement créé avec succès");
    });
    console.log("req.body:", req.body);
});

module.exports = router;
