const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/", authorize, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id, user_name, user_email, role FROM users WHERE user_id = $1",
      [req.user.id]
    );
    const row = result.rows[0] || {};

    const role = row.role;
    return res.json({ user_name: row.user_name, user_email: row.user_email, role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;


