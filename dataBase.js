
const { Pool } = require("pg");

const pool = new Pool({
	user: "node",
	host: "localhost",
	password: "node",
	database: "tareas",
	port: 5432,
});


module.exports = { pool };