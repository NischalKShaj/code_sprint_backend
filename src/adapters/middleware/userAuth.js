// ================== file to show the users authentication for the application =================== //
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.authenticateUserJwt = (req, res, next) => {
  const token = req.cookies.access_token || req.headers["authorization"];
  const actualToken =
    token && token.startsWith("Bearer") ? token.slice(7) : token;
  if (!actualToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(actualToken, process.env.SECRET);
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "forbidden" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
