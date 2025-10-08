const express = require("express");
const router = express.Router();
const validInfo = require('../middleware/validInfo');
const authorize = require('../middleware/authorize');
const authController = require('../controllers/authController');

router.post('/register', validInfo, authController.register);
router.post('/login', validInfo, authController.login);
router.post('/verify', authorize, authController.verify);

module.exports = router;
