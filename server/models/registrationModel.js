const pool = require('../db');

async function findByEmail(email) {
  const result = await pool.query('SELECT * FROM registration WHERE contact_email = $1', [email]);
  return result.rows[0];
}

async function create({ company_name, contact_person, contact_email, status }) {
  const result = await pool.query(
    'INSERT INTO registration (company_name, contact_person, contact_email, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [company_name || null, contact_person || null, contact_email, status || 'pending']
  );
  return result.rows[0];
}

module.exports = {
  findByEmail,
  create,
};
