import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/courses.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import planRoutes from "./routes/plan.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import passport from "passport";
import "./config/passport.js";
import oauthRoutes from "./routes/oauth.routes.js";











dotenv.config();
console.log("JWT SECRET:", process.env.JWT_SECRET);


const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.CLIENT_URL || "http://localhost:5173"
  ].filter(Boolean),
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/payments", paymentRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/plans", planRoutes);
app.use("/ai", aiRoutes);
app.use(passport.initialize());
app.use("/auth", oauthRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
