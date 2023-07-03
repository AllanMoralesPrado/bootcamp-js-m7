const { query, endPool } = require("./query.js");

const { faker } = require("@faker-js/faker/locale/es");


async function insertUser(...args) {
    if(args.length === 0) {
        const user = {
            text: "INSERT INTO usuarios VALUES (DEFAULT, $1, $2) RETURNING *;",
            values: [faker.person.firstName(), faker.internet.email()],
            rowMode: "array",
            desc: "\nIngreso nueva usuario",
        };
        const result = await query(user);
		console.log(user.desc);
		return result;
    } else if(args.length === 2) {
        const user = {
			text: "INSERT INTO usuarios VALUES (DEFAULT, $1, $2) RETURNING *;",
			values: [args[0], args[1]],
			rowMode: "array",
			desc: "\nIngreso nueva usuario",
		};
        const result = await query(user);
		console.log(user.desc);
		return result;
    } else {
        throw new Error("Número de parámetros erróneo");
    }
}

async function insertTarea(...args) {
	if (args.length === 3) {
		const tarea = {
			text: "INSERT INTO tareas VALUES (DEFAULT, $1, $2, 'false', $3) RETURNING *;",
			values: [args[0], args[1], args[2]],
			rowMode: "array",
			desc: "\nIngreso nueva tarea",
		};
		const result = await query(tarea);
		console.log(tarea.desc);
		return result;
	} else {
		throw new Error("Número de parámetros erróneo");
	}
}

insertUser().then((res) => console.log(res));
insertTarea("Queries", "Hacer los queries", "3").then((res) => console.log(res));


endPool();