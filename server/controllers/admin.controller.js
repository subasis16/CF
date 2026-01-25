import prisma from "../db.js";

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.json(users);
};

// Update role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["student", "instructor", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
  });

  res.json({
    message: "Role updated",
    user,
  });
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCourses = await prisma.course.count();
    const instructors = await prisma.user.count({
      where: { role: "instructor" },
    });

    res.json({
      totalUsers,
      totalCourses,
      instructors,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

/* =========================
   ADMIN COURSE MANAGEMENT
========================= */

// 📚 Get all courses (admin)
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// ❌ Delete any course (admin)
export const deleteCourseAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({
      where: { id },
    });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};
