import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

// middleware/authMiddleware.js
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing",
            });
        }

        // Optional: You can also check if it's a Bearer token
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format. Use 'Bearer <token>'",
            });
        }

        // If you want to verify JWT tokens, you can uncomment this block:
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (err) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }

        next(); // continue if everything is fine
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export default authMiddleware
