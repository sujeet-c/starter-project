const router = require('express').Router();
const authorize = require('../middleware/authorize');
const pool = require('../db');

router.get('/me', authorize, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registration WHERE contact_email = $1', [req.user.email || req.user.user_email]);
    if (result.rows.length > 0) return res.json({ registered: true, registration: result.rows[0] });
    return res.json({ registered: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', authorize, async (req, res) => {
  try {
    const { company_name, contact_person, status } = req.body;
    const contact_email = req.user.email || req.user.user_email;

    const existing = await pool.query('SELECT * FROM registration WHERE contact_email = $1', [contact_email]);
    if (existing.rows.length > 0) return res.status(400).json({ msg: 'Already registered', registration: existing.rows[0] });

    const result = await pool.query(
      'INSERT INTO registration (company_name, contact_person, contact_email, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [company_name || null, contact_person || null, contact_email, status || 'pending']
    );

    return res.json({ registration: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
