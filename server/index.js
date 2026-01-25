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
    "http://localhost:5174"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT","PATCH" , "DELETE", "OPTIONS"]
}));

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




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
