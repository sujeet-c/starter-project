const pool = require('../db');

async function findByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
  return result.rows[0];
}

async function createUser(name, email, hashedPassword) {
  const result = await pool.query(
    'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query('SELECT user_id, user_name, user_email, role FROM users WHERE user_id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  findByEmail,
  createUser,
  findById,
};
