import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

import {
  getAllUsers,
  updateUserRole,
  getAdminStats, // ✅ ADD THIS
  getAllCoursesAdmin,
  deleteCourseAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

// 👥 Get all users
router.get(
  "/users",
  authenticate,
  authorize("admin"),
  getAllUsers
);

// 🔄 Change user role
router.put(
  "/users/:id/role",
  authenticate,
  authorize("admin"),
  updateUserRole
);

// 📊 Admin stats
router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  getAdminStats
);

router.get(
  "/courses",
  authenticate,
  authorize("admin"),
  getAllCoursesAdmin
);

router.delete(
  "/courses/:id",
  authenticate,
  authorize("admin"),
  deleteCourseAdmin
);

export default router;
