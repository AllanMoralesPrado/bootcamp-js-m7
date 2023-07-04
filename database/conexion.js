require("dotenv").config();
const { Pool } = require("pg");

const config = {
  allowExitOnIdle: true,
};

const pool = new Pool(config);

module.exports = pool;
