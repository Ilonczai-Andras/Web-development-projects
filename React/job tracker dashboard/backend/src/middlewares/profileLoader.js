const Profile = require('../models/Profile');

module.exports = async (req, res, next) => {
    const auth0_id = req.auth.sub;
    req.profile = await Profile.getProfileByAuth0Id(auth0_id);

    if (!req.profile) {
        console.log(`[AUTH] Profile not found for user: ${auth0_id}`);
        return res.status(404).json({ error: "Profile not found." });
    }

    console.log(`[AUTH] Profile loaded for user: ${req.profile.name} (ID: ${req.profile.id})`);
    next();
};