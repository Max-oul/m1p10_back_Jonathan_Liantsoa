const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const loginUser =  async (email , password) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error('User not found');
        }
        const isValidPassword = await user.isValidPassword(password);
        if(!isValidPassword){
            throw new Error('Invalid password');
        }
        const token = jwt.sign({userId: user._id} ,process.env.JWT_SECRET, {expiresIn: '1d'});
        return {user, token};

    }catch(err){
        throw new Error('Internal server error');
    }
}

const registerUser = async (userData) => {
    try{
        const {f_name, l_name, phone, address, email, password, role } = userData;
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error('User already exists');
        }
        const newUser = new User({
            f_name, 
            l_name, 
            phone,
            address,
            email,
            password,
            role,
        });
        await newUser.save();
        const token = jwt.sign({userId: user._id} ,process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        return { newUser, token };
    } catch (error){
        throw new Error('Internal server error')
    }
}

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Internal server error');
    }
}

const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        throw new Error('Internal server error');
    }
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Internal server error');
    }
}

const getUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Internal server error');
    }
}

module.exports = {
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
    getUserById, 
    getUser
};