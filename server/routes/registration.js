const router = require('express').Router();
const authorize = require('../middleware/authorize');
const registrationController = require('../controllers/registrationController');

router.get('/me', authorize, registrationController.getRegistration);
router.post('/', authorize, registrationController.createRegistration);

module.exports = router;
