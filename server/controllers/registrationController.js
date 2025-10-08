const registrationModel = require('../models/registrationModel');

async function getRegistration(req, res) {
  try {
    const contact_email = req.user.email || req.user.user_email;
    const registration = await registrationModel.findByEmail(contact_email);
    if (registration) return res.json({ registered: true, registration });
    return res.json({ registered: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

async function createRegistration(req, res) {
  try {
    const { company_name, contact_person, status } = req.body;
    const contact_email = req.user.email || req.user.user_email;

    const existing = await registrationModel.findByEmail(contact_email);
    if (existing) return res.status(400).json({ msg: 'Already registered', registration: existing });

    const registration = await registrationModel.create({ company_name, contact_person, contact_email, status });
    return res.json({ registration });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getRegistration,
  createRegistration,
};
