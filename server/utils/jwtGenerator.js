const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user) {

  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name || null,
      role: user.role || null,
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' });
}

module.exports = jwtGenerator;
