const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const getApplications = async () => {
    const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    return rows;
};

const createApplication = async (data) => {
    const { title, status } = data;
    const { rows } = await pool.query('INSERT INTO applications (title, status) VALUES ($1, $2) RETURNING *', [title, status]);
    return rows[0];
};

const updateApplication = async (id, data) => {
    const { title, status } = data;
    const { rows } = await pool.query('UPDATE applications SET title=$1, status=$2 WHERE id=$3 RETURNING *', [title, status, id]);
    return rows[0];
};

const deleteApplication = async (id) => {
    await pool.query('DELETE FROM applications WHERE id=$1', [id]);
};

module.exports = { getApplications, createApplication, updateApplication, deleteApplication };
