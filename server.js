const http = require('http')
const express = require('express');
const app = express();
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Gestion des routes
const getEvent = require('./api/getEvent');

// Redirection des routes sous /api
app.use('/api', getEvent);  // Utiliser '/api' pour toutes les routes dans getEvent.js

// Swagger Documentation
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Intranet Osartis-Marquion doc",
            version: "1.0",
            description: 
            "Api de communication pour le calendrier partagé de l'intranet de Osartis-Marquion, afin d'ajouter/supprimer/regarder un évènement.",
            contact: {
                name: "Maxence Rémy",
                url: "https://cc-osartis.com",
                email: "maxence.remy26@gmail.com"
            }
        },
        servers: [
            { url: 'http://localhost:5000/api' },  // Adapter l'URL de base avec /api
        ],
    },
    apis: ["./api/*.js"]
};

const spacs = swaggerjsdoc(options)
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

// Lancer le serveur
const server = http.createServer(app);
server.listen(5000, 'localhost', () => {
    console.log('Server is listening at localhost on port 5000')
});
