const http = require("http");

const Tarea = require("./tarea");
const Usuario = require("./usuario");

http.createServer(async (req, res) => {
	const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
//	const params = new URLSearchParams(searchParams);

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
				putArchivo("anime");
				break;
			case "DELETE":
				deleteArchivo("anime");
				break;
		}
	} else {
		notFound();
	}
}).listen(3000);
