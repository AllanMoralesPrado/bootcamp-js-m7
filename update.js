const { query, endPool } = require("./query.js");

async function updateUser(id, ...args) {
	console.log("entro");
	if (args.length < 3 && args.length > 0) {
		const user = {
			text: `UPDATE usuarios SET 
                nombre = COALESCE($1, nombre), 
                correo = COALESCE($2, correo) 
                WHERE id = ${id} RETURNING *;`,
			values: [args[0], args[1]],
			rowMode: "array",
			desc: "\nUsuario actualizado",
		};
		const result = await query(user);
		console.log(user.desc);
		return result;
	} else {
        throw new Error("Número de parámetros erróneo");
    }
}

async function updateTarea(id, ...args) {
	if (args.length < 5 && args.length > 0) {
		const tarea = {
			text: `UPDATE tareas SET 
            titulo = COALESCE($1, titulo), 
            descripcion = COALESCE($2, descripcion),
            completado = COALESCE($3, completado),
            usuario_id = COALESCE($4, usuario_id)
            WHERE id = ${id} RETURNING *;`,
			values: [args[0], args[1], args[2], args[3]],
			rowMode: "array",
			desc: "\nTarea actualizada",
		};
		const result = await query(tarea);
		console.log(tarea.desc);
		return result;
	} else {
		throw new Error("Número de parámetros erróneo");
	}
}

updateUser(21, "Juan Carlos").then((res) => console.log(res));
updateTarea(16 ,"Gym", null, true, "1", true).then((res) => console.log(res));

endPool();
