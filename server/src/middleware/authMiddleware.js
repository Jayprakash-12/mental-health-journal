import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // Check for token in cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error('Auth Error:', error.message);

            // Differentiate between Token errors and DB/Network errors
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                res.status(401);
                const err = new Error('Not authorized, token failed');
                return next(err);
            } else {
                // It's likely a DB connection issue (ENOTFOUND, etc)
                res.status(500);
                const err = new Error(`Server Error during Auth: ${error.message}`);
                return next(err);
            }
        }
    } else {
        res.status(401);
        const err = new Error('Not authorized, no token');
        return next(err);
    }
};
