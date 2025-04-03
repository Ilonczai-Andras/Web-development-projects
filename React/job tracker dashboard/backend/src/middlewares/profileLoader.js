const Profile = require('../models/Profile');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
    const auth0_id = req.auth.sub;
    req.profile = await Profile.getProfileByAuth0Id(auth0_id);

    if (!req.profile) {
        logger.auth(`Profile not found for user: ${auth0_id}`);
        return res.status(404).json({ error: "Profile not found." });
    }

    logger.auth(`Profile loaded for user: ${req.profile.name} (ID: ${req.profile.id})`);
    next();
};
