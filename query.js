const { pool } = require("./dataBase.js");
const { errorCode } = require("./error.js");

async function query(obj) {
	let client;
	try {
		client = await pool.connect();
		const result = await client.query(obj);
		return result.rows;
	} catch (err) {
		errorCode(err);
	} finally {
		client.release();
	}
};

function endPool() {
    pool.end();
}
module.exports = { query, endPool };
