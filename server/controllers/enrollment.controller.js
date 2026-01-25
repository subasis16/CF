import prisma from "../db.js";

export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};

export const checkEnrollment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const enrolled = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    res.json({ enrolled: !!enrolled });
  } catch (err) {
    res.status(500).json({ message: "Enrollment check failed" });
  }
};
