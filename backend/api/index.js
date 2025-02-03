import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Initialize Express app and set port for the server.
const app = express();
const port = 3000;


// Created the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.rainbow.bold);
});

// Load environment variables from.env file
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB".bgCyan.underline);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`.red.underline.bold);
  });
