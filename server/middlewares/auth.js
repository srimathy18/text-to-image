import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Missing or Invalid Token.' });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Token Missing.' });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenDecode?.id) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Invalid Token.' });
        }

        req.userId = tokenDecode.id; // Store userId in req.userId
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
    }
};

export default userAuth;
