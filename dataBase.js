const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  /*
   user: "postgres",
  host: "localhost",
  password: "seiryo",
  database: "tareas",
  port: 5432,
 */
});

module.exports = { pool };
