const http = require('http')
const express = require('express');
const app = express();

// Gestion des routes
const createEvent = require('./api/createEvent');
const deleteEvent = require('./api/deleteEvent');
const getEvent = require('./api/getEvent');

// Redirection des routes
app.use('/api/createEvent', createEvent);
app.use('/api/deleteEvent', deleteEvent);
app.use('/', getEvent);

// Server
const server = http.createServer(app);

server.listen(5000, 'localhost', () => {
    console.log('Server is listening at localhost on port 5000')
})


// npm start = run le server

// ctrl + c / o = fermer le server

// là tu ne fait que ce qui concerne ton server
// tu relis dis a server de run api

// avec postman tu test ton api genre : http://localhost:5000/api/user
// j'ai installer express pour que tu définisses tes routes : "npm install express"