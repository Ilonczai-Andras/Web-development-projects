const Profile = require('../models/Profile');

exports.createOrUpdateProfile = (data) => Profile.createProfile(data);
exports.getProfileByAuth0Id = (auth0_id) => Profile.getProfileByAuth0Id(auth0_id);