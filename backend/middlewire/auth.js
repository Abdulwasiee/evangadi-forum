const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.SECRET_KEY;

async function authMiddleWire(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authentication invali" });
  }

  try {
   
    const token = authHeader.split(" ")[1];
    // Verify the token
    const {username,id} = jwt.verify(token, JWT_SECRET);
    req.user = {username,id};

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleWire;
