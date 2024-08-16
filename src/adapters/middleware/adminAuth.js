// ================== file to show the admins authentication for the application =================== //
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports.authenticateAdminJwt = (req, res, next) => {
  const token = req.cookies.admin_access_token || req.headers["authorization"];

  // Remove "Bearer " prefix if present
  const actualToken =
    token && token.startsWith("Bearer ") ? token.slice(7) : token;

  if (!actualToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(actualToken, process.env.ADMIN_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "forbidden" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
