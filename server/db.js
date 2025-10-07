const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  port: 5433,
  database: "authtodo"
});

module.exports = pool;
