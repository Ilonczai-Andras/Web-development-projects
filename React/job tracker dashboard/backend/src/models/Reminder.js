const db = require('../config/db');

const createReminder = async ({ user_id, application_id, title, description, remind_at }) => {
    const { rows } = await db.query(
        `INSERT INTO reminders (user_id, application_id, title, description, remind_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [user_id, application_id, title, description, remind_at]
    );
    return rows[0];
};

const getRemindersByUserId = async (user_id) => {
    const { rows } = await db.query(
        `SELECT * FROM reminders WHERE user_id = $1 ORDER BY remind_at ASC`,
        [user_id]
    );
    return rows;
};

const getReminderById = async (id) => {
    const { rows } = await db.query(`SELECT * FROM reminders WHERE id = $1`, [id]);
    return rows[0];
};

const updateReminder = async (id, fields) => {
    const { title, description, remind_at } = fields;
    const { rows } = await db.query(
        `UPDATE reminders SET title = $1, description = $2, remind_at = $3, updated_at = NOW()
         WHERE id = $4 RETURNING *`,
        [title, description, remind_at, id]
    );
    return rows[0];
};

const deleteReminder = async (id) => {
    await db.query(`DELETE FROM reminders WHERE id = $1`, [id]);
    return { success: true };
};

module.exports = {
    createReminder,
    getRemindersByUserId,
    getReminderById,
    updateReminder,
    deleteReminder
};
