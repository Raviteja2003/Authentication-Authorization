const JWT = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Provide bearer token" });
    }

    try {
        const isVerified = await JWT.verify(token, process.env.SECRETKEY);
        if (isVerified) {
            req.userId = isVerified.id;
            next();
        } else {
            return res.status(401).json({ error: "Invalid Token" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Token verification failed" });
    }
};

module.exports = { authenticate };
