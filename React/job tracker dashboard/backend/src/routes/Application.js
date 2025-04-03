const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const profileLoader = require('../middlewares/profileLoader');
const applicationController = require('../controllers/applicationController');

// Middlewares
router.use(checkJwt);
router.use(profileLoader);

// Routes
router.get('/', applicationController.getAllApplications);
router.post('/', applicationController.createApplication);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
