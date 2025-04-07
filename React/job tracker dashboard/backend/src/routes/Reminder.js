const express = require('express');
const router = express.Router();
const checkJwt = require('../middlewares/checkJwt');
const reminderController = require('../controllers/reminderController');

router.get('/', checkJwt, reminderController.getReminders);
router.post('/', checkJwt, reminderController.createReminder);
router.put('/:id', checkJwt, reminderController.updateReminder);
router.delete('/:id', checkJwt, reminderController.deleteReminder);

module.exports = router;
