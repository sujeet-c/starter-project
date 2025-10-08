const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const userModel = require('../models/userModel');

async function register(req, res) {
  const { email, name, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);

    if (user) {
      return res.status(401).json('User already exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.createUser(name, email, bcryptPassword);

    const u = { id: newUser.user_id, email: newUser.user_email, name: newUser.user_name, role: newUser.role };
    const jwtToken = jwtGenerator(u);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.status(401).json('Invalid Credential');
    }

    const validPassword = await bcrypt.compare(password, user.user_password);

    if (!validPassword) {
      return res.status(401).json('Invalid Credential');
    }

    const u = { id: user.user_id, email: user.user_email, name: user.user_name, role: user.role };
    const jwtToken = jwtGenerator(u);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

function verify(req, res) {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  register,
  login,
  verify,
};
