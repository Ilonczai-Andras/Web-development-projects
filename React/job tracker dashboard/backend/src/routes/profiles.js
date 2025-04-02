const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const Profile = require('../models/Profile');

// Create or update profile manually
router.post('/', checkJwt, async (req, res) => {
    const auth0_id = req.auth.sub;
    const { name, email, picture } = req.body;

    if (!name || !email || !picture) {
        console.log(`[PROFILE] Missing data from user ${auth0_id}`);
        return res.status(400).json({ error: 'Missing name, email or picture' });
    }

    const profile = await Profile.createProfile({ auth0_id, name, email, picture });
    console.log(`[PROFILE] Profile created/updated for user ${auth0_id} - Name: ${name}`);

    res.json(profile);
});

// Get profile by auth0_id
router.get('/', checkJwt, async (req, res) => {
    try {
        const auth0_id = req.auth.sub;

        const profile = await Profile.getProfileByAuth0Id(auth0_id);

        if (!profile) {
            console.log(`[PROFILE] Profile not found for user ${auth0_id}`);
            return res.status(404).json({ error: 'Profile not found' });
        }

        console.log(`[PROFILE] Profile loaded for user ${auth0_id} - Name: ${profile.name}`);
        res.json(profile);

    } catch (err) {
        console.error(`[PROFILE] Error loading profile for user ${req.auth?.sub}:`, err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
