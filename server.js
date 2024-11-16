const http = require('http');
const express = require('express');
const app = express();
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

// Middleware pour gérer le JSON
app.use(express.json());

// CORS (Cross-Origin Resource Sharing) - pour autoriser toutes les origines
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Gestion des routes
const getEvent = require('./api/getEvent');

// Redirection des routes
app.use('/events', getEvent); // Utiliser /events pour toutes les opérations liées aux événements
app.use('/events/:id', getEvent); // Pour gérer les événements avec un ID spécifique
app.use('/events/type/:type', getEvent); // Pour gérer les événements d'un type spécifique

// Configuration Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Intranet Osartis-Marquion doc",
            version: "1.0",
            description: 
                "API de communication pour le calendrier partagé de l'intranet de Osartis-Marquion, permettant d'ajouter, supprimer et consulter des événements.",
            contact: {
                name: "Maxence Rémy",
                url: "https://cc-osartis.com",
                email: "maxence.remy26@gmail.com"
            }
        },
        servers: [
            // Si l'application est déployée sur Render, utilisez l'URL dynamique
            { url: `https://api-iat7.onrender.com` }, // Utilisez l'URL de votre application déployée
            // Ou sinon, pour le développement local, vous pouvez aussi garder l'option localhost:
            { url: 'http://localhost:4000' }, // URL pour le développement local
        ],
    },
    apis: ["./api/*.js"], // Spécifier le chemin des fichiers contenant la documentation Swagger
};

const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

// Utilisation du port dynamique fourni par Render ou un port local pour le développement
const port = 4000;  // Utilisez le port défini par Render ou 4000 pour local
const server = http.createServer(app);

// Démarrer le serveur
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Vous pouvez également exécuter ce serveur avec la commande suivante :
// npm start

// Pour fermer le serveur : Ctrl + C
