const router = require('express').Router();
const authorize = require('../middleware/authorize');
const userModel = require('../models/userModel');

router.post('/', authorize, async (req, res) => {
  try {
    const row = await userModel.findById(req.user.id) || {};
    const role = row.role;
    return res.json({ user_name: row.user_name, user_email: row.user_email, role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;


