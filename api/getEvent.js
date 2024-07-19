const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Books:
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
 */
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 * /:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 * /createevent/:
 *  post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       500:
 *         description: Some server error
 * /id/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       404:
 *         description: The book was not found
 * /delete/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
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
