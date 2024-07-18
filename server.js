const http = require('http')
const express = require('express');
const app = express();
app.use(express.json());


// Gestion des routes
const getEvent = require('./api/getEvent');

// Redirection des routes
app.use('/', getEvent);
app.use('/:id', getEvent);
app.use('/createEvent', getEvent);
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