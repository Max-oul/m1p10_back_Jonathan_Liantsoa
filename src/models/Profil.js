const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    preferences: {
        services: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }],
        employees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
}, { timestamps: true });


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;