import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const router = express.Router();
//Create routes to register new Users
router.post("/signup", signup);

// Create routes to signin existing Users
router.post("/signin", signin);

router.post("/google", google);

export default router;