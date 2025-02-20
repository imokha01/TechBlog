import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";


// Initialize Express app and set port for the server.
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware to use JSON as input of the backend
app.use(express.json());

// Middleware to use cookies
app.use(cookieParser());


//! Created the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.rainbow.bold);
});

// Load environment variables from.env file
dotenv.config();


//! Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB".bgCyan.underline);
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`.red.underline.bold);
  });

  //use the user route in the app
  app.use("/api/user", userRoutes); 
  app.use("/api/auth", authRoutes);

  //TODO Middleware to handle errors
  app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ 
      success: false,
      statusCode,
      message,
     });
  });