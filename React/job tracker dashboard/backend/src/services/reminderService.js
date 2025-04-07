const Reminder = require('../models/Reminder');

exports.createReminder = Reminder.createReminder;
exports.getRemindersByUserId = Reminder.getRemindersByUserId;
exports.getReminderById = Reminder.getReminderById;
exports.updateReminder = Reminder.updateReminder;
exports.deleteReminder = Reminder.deleteReminder;
