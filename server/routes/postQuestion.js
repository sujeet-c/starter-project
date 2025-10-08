const router = require('express').Router();
const authorize = require('../middleware/authorize');
const postQuestionController = require('../controllers/postQuestionController');

router.get('/options', authorize, postQuestionController.getAudienceOptions);
router.get('/platforms', authorize, postQuestionController.getPlatformOptions);
router.get('/frameworks', authorize, postQuestionController.getFrameworkOptions);
router.get('/designs', authorize, postQuestionController.getDesignOptions);

module.exports = router;
