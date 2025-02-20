import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


//created the routes for the user
const router = express.Router();

// GET request to test the user route
router.get("/test", test);
router.put('/update/:userId', verifyToken, updateUser);

export default router; 






//TODO NOTE ON USER ROUTE:
/**
  The routes file maps HTTP methods (e.g., GET, POST) to the corresponding controller functions.
  
 */