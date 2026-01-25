import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { becomeInstructor } from "../controllers/user.controller.js";

const router = express.Router();

// ✅ Become Instructor Route
router.patch(
  "/become-instructor",
  authenticate,
  becomeInstructor
);

export default router;
