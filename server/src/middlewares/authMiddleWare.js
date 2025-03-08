const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate users
const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.Authorization || req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Please login first" });
        }

        const token = header.replace("Bearer ", "");
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = verify; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};



// giving access to the endpoints based on roles
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Unauthorized action." });
        }
        next(); //authorized properly
    };
};

module.exports = {authenticate, authorize}
