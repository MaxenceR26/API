const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Intranet:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - published
 *       properties:
 *         event_title:
 *           type: string
 *           description: The title of your book
 *         event_date:
 *           type: string
 *           description: The book explanation
 *         descriptions:
 *           type: string
 *           description: The descriptions of evenement
 *         hours:
 *           type: string
 *           description: End evenement
 */
/**
 * @swagger
 * tags:
 *   name: Intranet
 *   description: La documentation de l'API de calendrier
 * /:
 *   get:
 *     summary: Afficher tout les évenements de tout les calendriers
 *     tags: [Intranet]
 *     responses:
 *       200:
 *         description: La liste des évenements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Intranet'
 * /createevent/:
 *  post:
 *     summary: Crée un évenement
 *     tags: [Intranet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Intranet'
 *     responses:
 *       200:
 *         description: La création de l'évenement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intranet'
 *       500:
 *         description: Une erreur serveur est survenue
 * /id/{id}:
 *   get:
 *     summary: Regarder un évenement en particulier grâce à un ID
 *     tags: [Intranet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'évenement
 *     responses:
 *       200:
 *         description: La réponse
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intranet'
 *       404:
 *         description: L'évenement n'a pas était trouvé
 * /delete/{id}:
 *   delete:
 *     summary: Supprimer un évenement grâce à un ID
 *     tags: [Intranet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'évenement à supprimer
 *
 *     responses:
 *       200:
 *         description: L'évenement à bien était supprimé
 *       404:
 *         description: L'ID de l'évenement à supprimer
 */
 

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

// Route GET pour supprimer un évènement avec un ID en particulier
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM `events` WHERE `id` = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Une erreur est survenue:', err);
            return res.status(500).send("Une erreur s’est produite lors de l’exécution de la requête.");
        }

        if (results.affectedRows === 0) {
            return res.status(404).send("Event not found.");
        }

        console.log("Requête exécutée avec succès :", results);
        res.status(200).send("Suppresion réussie.");
    });

    console.log("req.params.id:", req.params.id);
});

// Route GET pour obtenir un évènement avec un ID en particulier
router.get('/id/:id', (req, res) => {
    const id = req.params.id;

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

// Route GET pour obtenir un évènement avec un type en particulier
router.get('/type/:type', (req, res) => {
    const type = req.params.type;

    const query = 'SELECT * FROM `events` WHERE `type` = ?';

    connection.query(query, [type], function(err, results) {
        if (err) {
            console.log('erreur +> ', err)
        }
        console.log("Requête exécutée avec succès:", results);
        res.status(200).send(results);
    })
    console.log("req.params.type:", req.params.type);
});

// Route POST pour créer un événement
router.post('/createEvent', (req, res) => {
    const { event_date, event_title, descriptions, hours} = req.body;

    if (!event_date || !event_title || !descriptions || !hours) {
        res.status(400).send("Champs obligatoires manquants");
        return;
    }

    const query = 'INSERT INTO events (event_date, event_title, descriptions, hours) VALUES (?, ?, ?, ?)';

    connection.query(query, [event_date, event_title, descriptions, hours], function(err, results, fields) {
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
