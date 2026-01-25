export const requireInstructor = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  if (!["instructor", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Instructor access only" });
  }
  next();
};

