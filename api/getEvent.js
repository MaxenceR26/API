const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Intranet:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: Message à envoyer
 */
/**
 * @swagger
 * tags:
 *   name: Intranet
 *   description: La documentation de l'API
 * /envoiemessage:
 *  post:
 *     summary: Envoi un message
 *     tags: [Intranet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Intranet'
 *     responses:
 *       200:
 *         description: Le message a bien été envoyé.
 *       400:
 *         description: Le champ message est manquant.
 */

// Route POST pour envoyer un message
router.post('/envoiemessage', (req, res) => {
    const { message } = req.body; // Récupère le message envoyé

    // Vérification de la présence du message
    if (!message) {
        res.status(400).send("Le champ 'message' est obligatoire");
        return;
    }

    // Affiche le message dans la console
    console.log("Message reçu :", message);

    // Réponse au client
    res.status(200).send("Message reçu avec succès");
});

module.exports = router;
