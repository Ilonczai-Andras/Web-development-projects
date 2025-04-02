const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const Profile = require('../models/Profile');
const Application = require('../models/Application');

router.use(checkJwt);

// Middleware to load the profile after JWT validation
router.use(async (req, res, next) => {
    const auth0_id = req.auth.sub;
    req.profile = await Profile.getProfileByAuth0Id(auth0_id);

    if (!req.profile) {
        console.log(`[AUTH] Profile not found for user: ${auth0_id}`);
        return res.status(404).json({ error: "Profile not found." });
    }

    console.log(`[AUTH] Profile loaded for user: ${req.profile.name} (ID: ${req.profile.id})`);
    next();
});


// GET applications for profile
router.get('/', async (req, res) => {
    const apps = await Application.getApplications(req.profile.id);
    console.log(`[GET] Application returned for profile ID ${req.profile.id}`);
    res.json(apps);
});

// POST new application for profile
router.post('/', async (req, res) => {
    const app = await Application.createApplication(req.profile.id, req.body);
    console.log(`[Post] New application created: ${app.title} for profile ID ${req.profile.id}`);
    res.json(app);
});

// PUT update application
router.put('/:id', async (req, res) => {
    const app = await Application.updateApplication(req.params.id, req.body);
    res.json(app);
});

// DELETE application
router.delete('/:id', async (req, res) => {
    await Application.deleteApplication(req.params.id);
    res.json({ success: true });
});

module.exports = router;
