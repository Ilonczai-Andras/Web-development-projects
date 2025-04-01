const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt.js');
const Application = require('../models/Application.js');

router.use(checkJwt);

router.get('/', async (req, res) => {
    const apps = await Application.getApplications();
    res.json(apps);
});

router.post('/', async (req, res) => {
    const app = await Application.createApplication(req.body);
    res.json(app);
});

router.put('/:id', async (req, res) => {
    const app = await Application.updateApplication(req.params.id, req.body);
    res.json(app);
});

router.delete('/:id', async (req, res) => {
    await Application.deleteApplication(req.params.id);
    res.json({ success: true });
});

module.exports = router;
