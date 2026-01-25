import prisma from "../db.js";

export const requireEnrollment = async (req, res, next) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;

  const enrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId, courseId },
    },
  });

  if (!enrolled) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
