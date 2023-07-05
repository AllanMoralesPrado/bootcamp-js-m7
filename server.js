const http = require("http");

const Tarea = require("./tarea");
const Usuario = require("./usuario");

http.createServer(async (req, res) => {
	const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
	const params = new URLSearchParams(searchParams);

	const get = async (pathname) => {
		try {
			let select;
			if (pathname == "/tarea") {
				select = await Tarea.All();
			}
			if (pathname == "/usuario") {
				select = await Usuario.All();
			}
			select = JSON.stringify(select);
			res.statusCode = 200;
			res.write(select);
		} catch (err) {
			res.statusCode = 404;
			console.log("Error en la lectura de get de index.js");
			console.log(err.message);
		} finally {
			res.end();
		}
	};

	const post = async (pathname) => {
		let datos;
		req.on("data", (data) => {
			datos = JSON.parse(data);
		});
		req.on("end", async () => {
			try {
				let objeto;
				if (pathname == "/tarea") {
					objeto = new Tarea(datos.titulo, datos.descripcion, datos.completado, datos.usuario_id);
				}
				if (pathname == "/usuario") {
					objeto = new Usuario(datos.nombre, datos.correo);
				}
				const result = await objeto.insert();
				res.statusCode = 200;
				res.write(`Objeto ingresado con id ${result.id}`);
			} catch (err) {
				console.log("Error en post de index.js");
				console.log(err);
			} finally {
				res.end();
			}
		});
	};

	const put = async (pathname) => {
		let datos;
		req.on("data", (data) => {
			datos = JSON.parse(data);
		});
		req.on("end", async () => {
			try {
				const id = params.get("id");
				let objeto;
				if (pathname == "/tarea") {
					objeto = Tarea.Actualizar(id, datos.titulo, datos.descripcion, datos.completado, datos.usuario_id);
				}
				if (pathname == "/usuario") {
					objeto = Usuario.Actualizar(id, datos.nombre, datos.correo);
				}
				res.statusCode = 200;
				res.write(`Objeto actualizado con id ${id}`);
			} catch (err) {
				console.log("Error en put de index.js");
				console.log(err);
			} finally {
				res.end();
			}
		});
	};

	const borrar = async (pathname) => {
		let datos;
		req.on("data", (data) => {
			datos = JSON.parse(data);
		});
		req.on("end", async () => {
			try {
				const id = params.get("id");
				let objeto;
				if (pathname == "/tarea") {
					objeto = Tarea.Delete(id);
				}
				if (pathname == "/usuario") {
					objeto = Usuario.Delete(id);
				}
				res.statusCode = 200;
				res.write(`Objeto eliminado con id ${id}`);
			} catch (err) {
				console.log("Error en borrar de index.js");
				console.log(err);
			} finally {
				res.end();
			}
		});
	};

	const notFound = () => {
		res.statusCode = 404;
		res.write(`Error 404 Not Found`);
		res.end();
	};

	if (pathname == "/tarea" || pathname == "/usuario") {
		switch (req.method) {
			case "GET":
				get(pathname);
				break;
			case "POST":
				post(pathname);
				break;
			case "PUT":
				put(pathname);
				break;
			case "DELETE":
				borrar(pathname);
				break;
		}
	} else {
		notFound();
	}
}).listen(3000);
