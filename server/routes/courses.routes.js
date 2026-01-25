import express from "express";
import { authOptional } from "../middlewares/authOptional.middleware.js";
import {
  createCourse,
  getMyCourses,
  getCourseDetails,
  getAllCourses,
} from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { deleteCourse } from "../controllers/course.controller.js";
import { toggleCourseVisibility } from "../controllers/course.controller.js";





const router = express.Router();

// ✅ CREATE COURSE
router.post(
  "/",
  authenticate,
  authorize("instructor", "admin"),
  createCourse
);

// ✅ GET ALL COURSES (PUBLIC)
router.get("/", getAllCourses);

// ✅ GET MY COURSES
router.get(
  "/my",
  authenticate,
  authorize("instructor", "admin"),
  getMyCourses
);

// ✅ COURSE DETAILS
router.get("/:id", authOptional, getCourseDetails);

router.delete(
  "/:id",
  authenticate,
  authorize("instructor", "admin"),
  deleteCourse
);

router.patch(
  "/:id/visibility",
  authenticate,
  authorize("admin"),
  toggleCourseVisibility
);


export default router;

