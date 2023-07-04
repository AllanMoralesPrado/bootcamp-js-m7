const { pool } = require("./dataBase.js");

class Usuario {
	constructor(nombre, correo) {
		this._id;
		this._nombre = nombre;
		this._correo = correo;
	}
	//*Definición de Getters
	get id() {
		return this._id;
	}
	get nombre() {
		return this._nombre;
	}
	get correo() {
		return this._correo;
	}

	set id(nuevo) {
		if (nuevo === "") {
			throw "nuevo id indefinido";
		}
		this._id = nuevo;
	}
	set nombre(nuevo) {
		nuevo = nuevo.trim();
		if (nuevo === "") {
			throw "nuevo nombre indefinido";
		}
		this._nombre = nuevo;
	}
	set correo(nuevo) {
		nuevo = nuevo.trim();
		if (nuevo === "") {
			throw "nuevo apellido indefinido";
		}
		this._correo = nuevo;
	}

	insert() {
		const self = this;
		const sql = "INSERT INTO usuarios (nombre, correo) VALUES ($1, $2) RETURNING *";
		console.log(`Insertando el usuario: ${this.nombre} a la base de datos...`);
		// Resolviendo la consulta como una promesa
		return new Promise(function (resolve) {
			pool.query(sql, [self.nombre, self.correo], function (err, res) {
				if (err) {
					console.log(err);
				}
				console.log(`...usuario con id: ${res.rows[0].id} insertado en la bases de datos`);
				resolve(self);
			});
		});
	}

	allData() {
		let data = [];
		data.push(this.id);
		data.push(this.nombre);
		data.push(this.correo);
		return data;
	}

	static Find(id) {
		const sql = `SELECT * FROM usuarios WHERE id = $1 LIMIT 1`;
		console.log(`Consultando usuarios con id: ${id}...`);
		// Realizamos la consulta con una promesa
		return new Promise(function (resolve) {
			pool.query(sql, [id], function (err, resultRow) {
				if (err) {
					console.error(err);
				}
				const resultado = resultRow.rows[0];
				const usuario = new Usuario(resultado.nombre, resultado.correo);
				usuario.id = resultado.id;
				resolve(usuario);
			});
		});
	}

	static async Actualizar(id, ...args) {
		const usuario = await Usuario.Find(id);

		args[0] ||= usuario.nombre;
		args[1] ||= usuario.correo;
		const sql = `UPDATE usuarios SET 
                nombre = $1, 
                correo = $2 
                WHERE id = ${id} RETURNING *;`;

		return new Promise(function (resolve) {
			pool.query(sql, args, function (err, resultRow) {
				if (err) {
					console.error(err);
				}
				console.log(`Usuario con id ${id} actualizado`);
				resolve(args);
			});
		});
	}

	static Delete(id) {
		const sql = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
		return new Promise(function (resolve) {
			pool.query(sql, [id], function (err, res) {
				if (err) {
					console.log(err);
				}
				//console.log(`usuario con id: ${res.rows[0].id} eliminado de bases de datos`);
				resolve(res.rows[0]);
			});
		});
	}

	static All() {
		const sql = `SELECT * FROM usuarios`;
		console.log(`Realizando la consulta de todos los usuarios de la base de datos...`);
		// Realizamos la consulta con une promesa
		return new Promise(function (resolve) {
			pool.query(sql, function (err, results) {
				console.log(`...encontrados ${results.rowCount} usuarios registrados!`);
				// Seleccionamos los campos del objeto result con map();
				// y creamos cada uno de los objetos encontrados como User;
				const usuarios = results.rows.map(function (usuarioRow) {
					const usuario = new Usuario(usuarioRow.nombre, usuarioRow.correo);
					usuario.id = usuarioRow.id;
					return usuario;
				});
				resolve(usuarios);
			});
		});
	}
}

module.exports = Usuario;
