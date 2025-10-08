const postQuestionModel = require('../models/postQuestionModel');

async function getAudienceOptions(req, res) {
  try {
    const opts = await postQuestionModel.findDistinctTargetAudiences();
    return res.json({ options: opts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function getPlatformOptions(req, res) {
  try {
    const opts = await postQuestionModel.findDistinctPlatforms();
    return res.json({ options: opts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function getFrameworkOptions(req, res) {
  try {
    const opts = await postQuestionModel.findDistinctFrameworks();
    return res.json({ options: opts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function getDesignOptions(req, res) {
  try {
    const opts = await postQuestionModel.findDistinctDesignPreferences();
    return res.json({ options: opts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getAudienceOptions,
  getPlatformOptions,
  getFrameworkOptions,
  getDesignOptions,
};
