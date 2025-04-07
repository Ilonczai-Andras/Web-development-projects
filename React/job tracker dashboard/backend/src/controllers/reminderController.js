const reminderService = require('../services/reminderService');
const profileService = require('../services/profileService');

exports.createReminder = async (req, res, next) => {
    try {
        const auth0_id = req.auth.sub;
        const profile = await profileService.getProfileByAuth0Id(auth0_id);
        const user_id = profile.id;

        const { application_id, title, description, remind_at } = req.body;
        const reminder = await reminderService.createReminder({
            user_id,
            application_id,
            title,
            description,
            remind_at
        });
        res.json(reminder);
    } catch (err) {
        next(err);
    }
};

exports.getReminders = async (req, res, next) => {
    try {
        const auth0_id = req.auth.sub;
        const profile = await profileService.getProfileByAuth0Id(auth0_id);
        const user_id = profile.id;

        const reminders = await reminderService.getRemindersByUserId(user_id);
        res.json(reminders);
    } catch (err) {
        next(err);
    }
};

exports.updateReminder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, remind_at } = req.body;

        const updated = await reminderService.updateReminder(id, { title, description, remind_at });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteReminder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await reminderService.deleteReminder(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
