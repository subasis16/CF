import prisma from "../db.js";

export const becomeInstructor = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: "instructor" },
    });

    res.json({
      message: "You are now an instructor",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to become instructor" });
  }
};
