// Imports the necessary dependencies
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

// Creates an instance of the Express application
const app = express();

// Middleware to parse incoming request bodies (JSON data)
app.use(bodyParser.json());

// API routes for users and playlists
app.use('/users', usersRouter);

// Error handling middleware for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Exports the app for use in other files
module.exports = app;
