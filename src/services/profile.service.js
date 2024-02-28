const Profile = require("../models/Profil");

const createProfile = async (userId, profileData) => {
  try {
    const profile = new Profile({
      userId,
      ...profileData,
    });
    await profile.save();
    const populatedProfile = await Profile.findById(profile._id)
      .populate("userId")
      .populate("preferences.services")
      .populate("preferences.employees");
    return populatedProfile;
  } catch (error) {
    throw error;
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
    const populatedProfile = await Profile.findById(profile._id)
      .populate("userId")
      .populate("preferences.services")
      .populate("preferences.employees");
    return profile;
  } catch (error) {
    throw new error;
  }
};

const deleteProfile = async (id) => {
  try {
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (error) {
    throw error;
  }
};

const getProfile = async () => {
  try {
    const profile = await Profile.find();
    return profile;
  } catch (err) {
    throw error;
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
    throw  error;
  }
};

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
  getProfileById,
};
