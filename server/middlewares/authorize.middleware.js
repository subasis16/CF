export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // User must exist (authenticate ran before this)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Role check
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
