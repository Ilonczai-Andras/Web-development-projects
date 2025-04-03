const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const profileController = require('../controllers/profileController');

// Protected routes
router.post('/', checkJwt, profileController.createOrUpdateProfile);
router.get('/', checkJwt, profileController.getProfile);

module.exports = router;