const pool = require('../db');

async function createProject(project) {
  const query = `
    INSERT INTO projects (
      company_name, user_email, phone, project_title, description,
      audience, technologies, stack, design_preference, budget,
      timeline, third_party, approach, assets, post_support, document_paths
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    RETURNING *
  `;

  const values = [
    project.company_name,
    project.user_email,
    project.phone,
    project.project_title,
    project.description,
    project.audience,
    project.technologies || [],
    project.stack,
    project.design_preference,
    project.budget,
    project.timeline,
    project.third_party,
    project.approach,
    project.assets,
    project.post_support,
    project.document_paths || []
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createProject,
};
