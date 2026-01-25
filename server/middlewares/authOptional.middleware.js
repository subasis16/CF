export const authOptional = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return next();

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    // token invalid → ignore
  }

  next();
};

