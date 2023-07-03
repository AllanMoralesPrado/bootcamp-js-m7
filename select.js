const { query, endPool } = require("./query.js");

async function selectUser() {
	const user = {
		text: "SELECT * FROM usuarios;",
		rowMode: "array",
		desc: "\nSelección usuarios",
	};
	console.log(user.desc);
	return await query(user);
}

async function selectTarea() {
	const user = {
		text: "SELECT * FROM tareas;",
		rowMode: "array",
		desc: "\nSelección tareas",
	};
	console.log(user.desc);
	return await query(user);
}

selectUser().then((res) => console.table(res));
selectTarea().then((res) => console.table(res));

endPool();
