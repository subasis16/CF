import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { runAI } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/run", authenticate, runAI);

export default router;
