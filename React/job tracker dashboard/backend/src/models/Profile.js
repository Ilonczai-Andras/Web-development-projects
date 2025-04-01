const pool = require('./db');

const createProfile = async ({ auth0_id, name, email, picture }) => {
    const { rows } = await pool.query(
        `INSERT INTO profiles (auth0_id, name, email, picture) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (auth0_id) DO UPDATE SET 
             name = EXCLUDED.name, 
             email = EXCLUDED.email, 
             picture = EXCLUDED.picture 
         RETURNING *`,
        [auth0_id, name, email, picture]
    );
    return rows[0];
};

const getProfileByAuth0Id = async (auth0_id) => {
    const { rows } = await pool.query(
        `SELECT * FROM profiles WHERE auth0_id = $1`,
        [auth0_id]
    );
    return rows[0];
};

module.exports = { createProfile, getProfileByAuth0Id };
