const cron = require('node-cron');
const logger = require('../utils/logger');
const db = require('../config/db');
const nodemailer = require('nodemailer');

logger.cron('🟢 reminderJob.js betöltődött és fut.');

// Email küldő (egyszerű SMTP példa)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const verifyEmailConnection = async () => {
    try {
        await transporter.verify();
        logger.cron('✅ SMTP kapcsolat sikeres (Gmail)');
    } catch (err) {
        logger.error(`❌ SMTP kapcsolat sikertelen: ${err.message}`);
    }
};

verifyEmailConnection();

const sendReminders = async () => {
    try {
        const { rows: reminders } = await db.query(`
            SELECT r.*, p.email FROM reminders r
            JOIN profiles p ON r.user_id = p.id
            WHERE r.remind_at <= NOW() AND r.is_sent = false
        `);
        logger.cron(`🔍 Emlékeztetők száma a lekérdezésben: ${reminders.length}`);

        for (const reminder of reminders) {
            // E-mail küldése (vagy más értesítés)
            await transporter.sendMail({
                from: `"Job Tracker" <${process.env.EMAIL_USER}>`,
                to: reminder.email,
                subject: `🔔 Emlékeztető: ${reminder.title}`,
                text: reminder.description || 'Ne felejtsd el a feladatodat!'
            });

            // is_sent frissítése
            await db.query(`UPDATE reminders SET is_sent = true WHERE id = $1`, [reminder.id]);

            logger.cron(`Reminder sent to ${reminder.email} (id: ${reminder.id})`);
        }
    } catch (err) {
        logger.cron(`[CRON] Hiba történt az emlékeztetők küldése közben: ${err.message}`);
    }
};

// Cron ütemezés – percenként fut
cron.schedule('* * * * *', sendReminders);

module.exports = sendReminders;
