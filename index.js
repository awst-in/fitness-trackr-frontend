// create the express server here
require('dotenv').config();
const client = require('./db/client');
const cors = require('cors');
const express = require('express');
const server = express();
const morgan = require('morgan');
const { PORT = 4000 } = process.env;
const path = require('path');

//Middleware
server.use(cors());

server.use(express.json());

server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
// Serve up static assets
server.use(express.static(path.join(__dirname, 'public')));
//Routers
const apiRouter = require('./api');
server.use('/api', apiRouter);
// by default, serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//Error handling
//404
server.use('*', (req, res, next) => {
  res.status(404);
  res.send({ error: 'route not found' });
});
//500
server.use((error, req, res, next) => {
  res.status(500);
  res.send(error);
});

server.listen(PORT, () => {
  client.connect();
  console.log(`The server is up on port`, PORT);
});
