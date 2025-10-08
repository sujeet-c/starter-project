const pool = require('../db');

async function findDistinctTargetAudiences() {
  const result = await pool.query('SELECT DISTINCT target_audience FROM postquestion WHERE target_audience IS NOT NULL');
  return result.rows.map(r => r.target_audience).filter(Boolean);
}

async function findDistinctPlatforms() {
  const result = await pool.query('SELECT DISTINCT platform FROM postquestion WHERE platform IS NOT NULL');
  return result.rows.map(r => r.platform).filter(Boolean);
}

async function findDistinctFrameworks() {
  const result = await pool.query('SELECT DISTINCT framework FROM postquestion WHERE framework IS NOT NULL');
  return result.rows.map(r => r.framework).filter(Boolean);
}

async function findDistinctDesignPreferences() {
  const result = await pool.query('SELECT DISTINCT design_preference FROM postquestion WHERE design_preference IS NOT NULL');
  return result.rows.map(r => r.design_preference).filter(Boolean);
}

module.exports = {
  findDistinctTargetAudiences,
  findDistinctPlatforms,
  findDistinctFrameworks,
  findDistinctDesignPreferences,
};
