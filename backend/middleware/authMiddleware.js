const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const isTokenValid = jwt.verify(token, process.env.SECRET);

            if (isTokenValid) {
                const decodedToken = jwt.decode(token);
                req.user = decodedToken.id
                next();
            }
            else {
                const error = new Error("Invalid token");
                error.name = "UnauthorizedError";
                throw error;
            }
        }
        else {
            const error = new Error("No token provided");
            error.name = "UnauthorizedError";
            throw error;
        }
    }
    catch (err) {
        next(err);
    }
};

module.exports = authMiddleware;