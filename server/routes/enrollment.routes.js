import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  enrollCourse,
  checkEnrollment,
} from "../controllers/enrollment.controller.js";
import prisma from "../db.js";

const router = express.Router();

router.post("/enroll", authenticate, enrollCourse);

router.get(
  "/check/:courseId",
  authenticate,
  checkEnrollment
);

router.get("/my", authenticate, async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      select: { courseId: true },
    });

    res.json(enrollments.map(e => e.courseId));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});

export default router;
