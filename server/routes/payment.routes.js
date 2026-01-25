import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import { authenticate } from "../middlewares/auth.middleware.js";
import { PAYMENT_STATUS } from "../config/payment.js";

dotenv.config();

const router = express.Router();

router.post("/create-order", authenticate, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount required" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (error) {
    console.error("RAZORPAY ERROR:", error);
    res.status(500).json({ message: "Payment order failed" });
  }
});

router.get("/status", (req, res) => {
  res.json(PAYMENT_STATUS);
});

export default router;
