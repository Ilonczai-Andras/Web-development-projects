const pool = require('./db');

const getApplications = async (profile_id) => {
    const { rows } = await pool.query(
        'SELECT * FROM applications WHERE profile_id = $1 ORDER BY created_at DESC',
        [profile_id]
    );
    return rows;
};

const createApplication = async (profile_id, data) => {
    const { title, description, company, status, link, deadline } = data;
    const { rows } = await pool.query(
        `INSERT INTO applications (profile_id, title, description, company, status, link, deadline) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [profile_id, title, description, company, status, link, deadline]
    );
    return rows[0];
};

const updateApplication = async (id, data) => {
    const { title, description, company, status, link, deadline } = data;
    const { rows } = await pool.query(
        `UPDATE applications SET title=$1, description=$2, company=$3, status=$4, link=$5, deadline=$6, updated_at=NOW()
         WHERE id=$7 RETURNING *`,
        [title, description, company, status, link, deadline, id]
    );
    return rows[0];
};

const deleteApplication = async (id) => {
    await pool.query('DELETE FROM applications WHERE id=$1', [id]);
};

module.exports = { getApplications, createApplication, updateApplication, deleteApplication };
