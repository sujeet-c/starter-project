const projectModel = require('../models/projectModel');

async function createProject(req, res) {
  try {
    const p = req.body;

    if (!p.company_name || !p.user_email || !p.project_title) {
      return res.status(400).json({ error: 'company_name, user_email and project_title are required' });
    }


    if (!Array.isArray(p.technologies)) p.technologies = [];
    if (!Array.isArray(p.document_paths)) p.document_paths = [];

    const created = await projectModel.createProject(p);
    return res.status(201).json({ project: created });
  } catch (err) {
    console.error('createProject error', err.message || err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  createProject,
};
