const db = require('../config/db');

const Application = {
    async getApplications(profileId) {
        const result = await db.query('SELECT * FROM applications WHERE profile_id = $1', [profileId]);
        return result.rows;
    },

    async createApplication(profileId, data) {
        const result = await db.query(
            'INSERT INTO applications (profile_id, title, company, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [profileId, data.title, data.company, data.status]
        );
        return result.rows[0];
    },

    async updateApplication(id, data) {
        const result = await db.query(
            'UPDATE applications SET title = $1, company = $2, status = $3 WHERE id = $4 RETURNING *',
            [data.title, data.company, data.status, id]
        );
        return result.rows[0];
    },

    async deleteApplication(id) {
        await db.query('DELETE FROM applications WHERE id = $1', [id]);
        return { success: true };
    }
};

module.exports = Application;
