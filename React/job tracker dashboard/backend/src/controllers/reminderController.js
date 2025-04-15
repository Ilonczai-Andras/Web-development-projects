const reminderService = require('../services/reminderService');
const profileService = require('../services/profileService');

exports.createReminder = async (req, res, next) => {
    try {
      const auth0_id = req.auth.sub;
      const profile = await profileService.getProfileByAuth0Id(auth0_id);
      const user_id = profile.id;
  
      const {
        application_id,
        title,
        description,
        remind_at,
        notification_offset = 0,
      } = req.body;
  
      const remindDate = new Date(remind_at);
      const send_at = new Date(remindDate.getTime() - notification_offset * 60000);
  
      const reminder = await reminderService.createReminder({
        user_id,
        application_id,
        title,
        description,
        remind_at,
        notification_offset,
        send_at,
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
      const id = req.params.id;
      const data = req.body;
  
      const existing = await reminderService.getReminderById(id);
      if (!existing) {
        return res.status(404).json({ message: "Reminder not found" });
      }
  
      if (data.remind_at || data.notification_offset !== undefined) {
        const remindDate = new Date(data.remind_at || existing.remind_at);
        const offset = data.notification_offset ?? existing.notification_offset ?? 0;
        data.send_at = new Date(remindDate.getTime() - offset * 60000);
      }
  
      const updated = await reminderService.updateReminder(id, data);
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
