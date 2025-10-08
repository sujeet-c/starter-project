const router = require('express').Router();
const authorize = require('../middleware/authorize');
const projectController = require('../controllers/projectController');


router.post('/', authorize, projectController.createProject);

module.exports = router;
