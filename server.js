const http = require("http");

const { insertUser, insertTarea } = require("./insert.js");
const { updateUser, updateTarea } = require("./update.js");
const { selectUser, selectTarea } = require("./select.js");
const { deleteUser, deleteTarea } = require("./delete.js");

http.createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
	const params = new URLSearchParams(searchParams);

    const getArchivo = async () => {
		try {
            let select = await selectUser();
            select = JSON.stringify(select);
			res.statusCode = 200;
			res.write(select);
		} catch (err) {
			res.statusCode = 404;
			console.log("Error en la lectura de archivo en getArchivo de index.js");
			console.log(err.message);
		} finally {
			res.end();
		}
	};

		const postArchivo = async () => {
			let datos;
			req.on("data", (data) => {
				datos = JSON.parse(data);
			});
			req.on("end", async () => {
				try {
					console.log(datos);
					let select = await selectUser();
					select = JSON.stringify(select);
					res.statusCode = 200;
					res.write(select);
				} catch (err) {
					console.log("Error en postArchivo de index.js");
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

	if (pathname == "/usuario") {
		switch (req.method) {
			case "GET":
				getArchivo();
				break;
			case "POST":
				postArchivo("anime");
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
