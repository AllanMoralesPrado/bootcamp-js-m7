const { query, endPool } = require("./query.js");

async function deleteUser(id) {
	const user = {
		text: "DELETE FROM usuarios WHERE id = $1 RETURNING *;",
		values: [id],
		rowMode: "array",
		desc: `\nUsuario id ${id} eliminado`,
	};
	console.log(user.desc);
	return await query(user);
}

async function deleteTarea(id) {
	const user = {
		text: "DELETE FROM tareas WHERE id = $1 RETURNING *;",
		values: [id],
		rowMode: "array",
		desc: `\nTarea id ${id} eliminada`,
	};
	console.log(user.desc);
	return await query(user);
}

deleteUser(22).then((res) => console.table(res));
deleteTarea(18).then((res) => console.table(res));

endPool();
