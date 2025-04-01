const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const Profile = require('../models/Profile');
const Application = require('../models/Application');

router.use(checkJwt);

// GET applications for profile
router.get('/', async (req, res) => {
    const apps = await Application.getApplications(req.profile.id);
    res.json(apps);
});

// POST new application for profile
router.post('/', async (req, res) => {
    const app = await Application.createApplication(req.profile.id, req.body);
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
