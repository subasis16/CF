import razorpay from "../utils/razorpay.js";
import prisma from "../db.js";

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    // 1. Check course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2. Create Razorpay order
    const order = await razorpay.orders.create({
      amount: course.price * 100, // paise
      currency: "INR",
      receipt: `course_${course.id}_${req.user.id}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseTitle: course.title,
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
};
