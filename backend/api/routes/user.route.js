import express from "express";
import { test } from "../controllers/user.controller.js";

//created the routes for the user
const router = express.Router();

router.get("/test", test);

export default router; 