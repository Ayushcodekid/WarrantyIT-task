const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // read token from cookie

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = auth;
