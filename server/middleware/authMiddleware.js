// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || '';
//     const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
//     if (!token) return res.status(401).json({ error: 'Authentication required' });

//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(payload.id);

//     if (!user) return res.status(401).json({ error: 'Invalid token' });

//     req.user = user; // attach user
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };



// middleware/auth.js
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
