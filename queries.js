const { pool } = require("./dataBase.js");
const { errorCode } = require("./error.js");

const { faker } = require("@faker-js/faker/locale/es");


function insertUser(...args) {
    if(args.length === 0) {
        const user = {
            text: "INSERT INTO usuarios VALUES (DEFAULT, $1, $2) RETURNING *;",
            values: [faker.person.firstName(), faker.internet.email()],
            rowMode: "array",
            desc: "\nIngreso nueva cuenta",
        };
        query(user);
    } else if(args.length === 2) {
        const user = {
			text: "INSERT INTO usuarios VALUES (DEFAULT, $1, $2) RETURNING *;",
			values: [args[0], args[1]],
			rowMode: "array",
			desc: "\nIngreso nueva cuenta",
		};
        query(user);
    } else {
        throw new Error("Número de parámetros erróneo");
    }
}

function insertTarea(...args) {
	if (args.length === 3) {
		const user = {
			text: "INSERT INTO tareas VALUES (DEFAULT, $1, $2, 'false', $3) RETURNING *;",
			values: [args[0], args[1], args[2]],
			rowMode: "array",
			desc: "\nIngreso nueva cuenta",
		};
		query(user);
	} else {
		throw new Error("Número de parámetros erróneo");
	}
}

const query = (obj) => {
	pool.connect()
		.then((client) => {
			client
				.query(obj)
				.then((result) => {
					console.log(obj.desc);
					console.log(result.rows);
					return result.rows;
				})
				.catch((err) => {
					errorCode(err);
				})
				.finally(() => {
					client.release();
				});
		})
		.catch((err) => {
			errorCode(err);
		})
		.finally(() => {
			pool.end();
		});
};

insertUser();
insertTarea("Queries", "Hacer los queries", "3");


