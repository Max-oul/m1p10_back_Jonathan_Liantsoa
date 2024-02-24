const Profile = require("../models/Profil");

const createProfile = async (userId, profileData) => {
  try {
    const profile = new Profile({
      userId,
      ...profileData,
    });
    await profile.save();
    return profile;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};

const updateProfile = async (id, profileData) => {
  try {
    const profile = await Profile.findByIdAndUpdate(id, profileData, {
      new: true,
    });
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};

const deleteProfile = async (id) => {
  try {
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};

const getProfile = async () => {
  try {
    const profile = await Profile.find();
    return profile;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};

const getProfileById = async (id) => {
  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
  getProfileById,
};
