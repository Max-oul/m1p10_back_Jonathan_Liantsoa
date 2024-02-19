const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!token){
        return res.status(401).json({error: 'Access denied'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        req.user = user;
        next();
    } catch (error){
        return res.status(401).json({error: 'Invalid token'});
    }
};

module.exports = authMiddleware;