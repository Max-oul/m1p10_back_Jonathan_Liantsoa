const Profile = require('../models/Profil');

const createProfile = async (userId, profileData) => {
    const profile = new Profile({
        userId,
        ...profileData,
    });
    await profile.save();
    return profile;
}

const updateProfile = async(id, profileData) => {
    const profile = await Profile.findByIdAndUpdate(id, profileData, {new: true});
    if(!profile) {
        throw new Error('Profile not found');
    }
    return profile;
}

const deleteProfile = async(id) => {
    const profile = await Profile.findByIdAndDelete(id);
    if(!profile) {
        throw new Error('Profile not found');
    }
    return profile;
}


const getProfile = async() => {
    const profile = await Profile.find();
    return profile;
}

const getProfileById = async(id) => {
    const profile = await Profile.findById(id);
    if(!profile) {
        throw new Error('Profile not found');
    }
    return profile;
}


module.exports = {
    createProfile,
    updateProfile,
    deleteProfile,
    getProfile,
    getProfileById
}
