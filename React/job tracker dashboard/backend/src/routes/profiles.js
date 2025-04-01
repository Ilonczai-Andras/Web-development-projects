const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const Profile = require('../models/Profile');

// Create or update profile manually
router.post('/', checkJwt, async (req, res) => {
    const auth0_id = req.auth.sub;
    const { name, email, picture } = req.body;

    if (!name || !email || !picture) {
        return res.status(400).json({ error: 'Missing name, email or picture' });
    }

    const profile = await Profile.createProfile({ auth0_id, name, email, picture });
    res.json(profile);
});

// Get profile by auth0_id
router.get('/', checkJwt, async (req, res) => {
    try {
        const auth0_id = req.auth.sub;

        const profile = await Profile.getProfileByAuth0Id(auth0_id);

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(profile);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
