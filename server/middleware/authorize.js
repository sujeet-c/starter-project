const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = function(req, res, next) {

  const authHeader = req.header('Authorization') || req.header('authorization');
  if (!authHeader) return res.status(403).json({ msg: 'authorization denied' });

  const parts = String(authHeader).split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') return res.status(401).json({ msg: 'Token is not valid' });

  const token = parts[1];

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
