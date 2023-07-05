const { pool } = require("./dataBase.js");

class Tarea {
	constructor(titulo, descripcion, completado, usuario_id) {
		this._id;
		this._titulo = titulo;
		this._descripcion = descripcion;
		this._completado = completado;
		this._usuario_id = usuario_id;
	}
	//*Definición de Getters
	get id() {
		return this._id;
	}
	get titulo() {
		return this._titulo;
	}
	get descripcion() {
		return this._descripcion;
	}
	get completado() {
		return this._completado;
	}
	get usuario_id() {
		return this._usuario_id;
	}
    //*Definición de Setters
	set id(nuevo) {
		if (nuevo === "") {
			throw "nuevo id indefinido";
		}
		this._id = nuevo;
	}
	set titulo(nuevo) {
		nuevo = nuevo.trim();
		if (nuevo === "") {
			throw "nuevo titulo indefinido";
		}
		this._titulo = nuevo;
	}
	set descripcion(nuevo) {
		nuevo = nuevo.trim();
		if (nuevo === "") {
			throw "nuevo apellido indefinido";
		}
		this._descripcion = nuevo;
	}
	set completado(nuevo) {
		if (nuevo === "") {
			throw "nuevo completado indefinido";
		}
		this._titulo = nuevo;
	}
	set usuario_id(nuevo) {
		if (nuevo === "") {
			throw "nuevo apellido indefinido";
		}
		this._usuario_id = nuevo;
	}

	insert() {
		const self = this;
		const sql = "INSERT INTO tareas (titulo, descripcion, completado, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *";
		console.log(`Insertando el tarea: ${this.titulo} a la base de datos...`);
		// Resolviendo la consulta como una promesa
		return new Promise(function (resolve) {
			pool.query(sql, [self.titulo, self.descripcion, self.completado, self.usuario_id], function (err, res) {
				if (err) {
					console.log(err);
				}
				console.log(`Tarea con id: ${res.rows[0].id} insertado en la bases de datos`);
				resolve(res.rows[0]);
			});
		});
	}

	allData() {
		let data = [];
		data.push(this.id);
		data.push(this.titulo);
		data.push(this.descripcion);
        data.push(this.completado);
        data.push(this.usuario_id);
		return data;
	}

	static Find(id) {
		const sql = `SELECT * FROM tareas WHERE id = $1 LIMIT 1`;
		console.log(`Consultando tareas con id: ${id}...`);
		// Realizamos la consulta con una promesa
		return new Promise(function (resolve) {
			pool.query(sql, [id], function (err, resultRow) {
				if (err) {
					console.error(err);
				}
				const resultado = resultRow.rows[0];
				const tarea = new Tarea(resultado.titulo, resultado.descripcion, resultado.completado, resultado.usuario_id);
				tarea.id = resultado.id;
				resolve(tarea);
			});
		});
	}

	static async Actualizar(id, ...args) {
		const tarea = await Tarea.Find(id);

		args[0] ||= tarea.titulo;
		args[1] ||= tarea.descripcion;
        args[2] ||= tarea.completado;
		args[3] ||= tarea.usuario_id;
		const sql = `UPDATE tareas SET 
                titulo = $1, 
                descripcion = $2,
                completado = $3, 
                usuario_id = $4
                WHERE id = ${id} RETURNING *;`;

		return new Promise(function (resolve) {
			pool.query(sql, args, function (err, resultRow) {
				if (err) {
					console.error(err);
				}
				console.log(`Tarea con id ${id} actualizado`);
				resolve(resultRow.rows[0]);
			});
		});
	}

	static Delete(id) {
		const sql = "DELETE FROM tareas WHERE id = $1 RETURNING *";
		return new Promise(function (resolve) {
			pool.query(sql, [id], function (err, res) {
				if (err) {
					console.log(err);
				}
				//console.log(`tarea con id: ${res.rows[0].id} eliminado de bases de datos`);
				resolve(res.rows[0]);
			});
		});
	}

	static All() {
		const sql = `SELECT * FROM tareas`;
		console.log(`Realizando la consulta de todos los tareas de la base de datos...`);
		// Realizamos la consulta con une promesa
		return new Promise(function (resolve) {
			pool.query(sql, function (err, results) {
				console.log(`...encontrados ${results.rowCount} tareas registrados!`);
				// Seleccionamos los campos del objeto result con map();
				// y creamos cada uno de los objetos encontrados como User;
				const tareas = results.rows.map(function (tareaRow) {
					const tarea = new Tarea(tareaRow.titulo, tareaRow.descripcion);
					tarea.id = tareaRow.id;
					return tarea;
				});
				resolve(tareas);
			});
		});
	}
}

module.exports = Tarea;
