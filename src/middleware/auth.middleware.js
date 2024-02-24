const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication token must be provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error();
        }
        //Attach the user information and token to the request object so it can be used in the routes
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authenticated' });
    }
};
module.exports = authMiddleware;