const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({error: "dont have access"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {id: decoded.id}
    next()
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
}