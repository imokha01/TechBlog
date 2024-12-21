import express from 'express';
import colors from 'colors';

// Initialize Express app and set port for the server.
const app = express();
const port = 3000;

// Created the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.rainbow.bold)
})
