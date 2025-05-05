
import jwt from "jsonwebtoken";

const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    res.status(500).json({ success: false, message: "Authentication failed." });
  }
};

export default authmiddleware;
