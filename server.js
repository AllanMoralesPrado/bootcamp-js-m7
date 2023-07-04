const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const {
  createUser,
  getUsers,
  updateUser,
  removeUser,
} = require("./controllers/usuarios.controller.js");

http
  .createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(
      req.url,
      `http://${req.headers.host}`
    );

    const params = new URLSearchParams(searchParams);

    //GET ROUTE
    if (pathname === "/users" && req.method === "GET") {
      const data = await getUsers();

      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(data));
    }

    //POST ROUTE
    if (pathname === "/users" && req.method === "POST") {
      let body;

      req.on("data", async (chunk) => {
        body = JSON.parse(chunk);
      });

      req.on("end", async () => {
        const newUser = await createUser(body);
        res.setHeader("content-type", "application/json");
        res.statusCode = newUser.status;
        res.end(JSON.stringify(newUser));
      });
    }

    //PUT ROUTE
    if (pathname === "/users" && req.method === "PUT") {
      const id = params.get("id");
      let body;

      req.on("data", async (chunk) => {
        body = JSON.parse(chunk);
      });

      req.on("end", async () => {
        const newUser = await updateUser(body, id);
        res.setHeader("content-type", "application/json");
        res.statusCode = newUser.status;
        res.end(JSON.stringify(newUser));
      });
    }

    //DELETE ROUTE
    if (pathname === "/users" && req.method === "DELETE") {
      const id = params.get("id");

      const deletedUser = await removeUser(id);
      res.setHeader("content-type", "application/json");
      res.statusCode = deletedUser.status;
      res.end(JSON.stringify(deletedUser));
    }
  })
  .listen(PORT, console.log(`🟢 Servidor encendido en el puerto ${PORT}`));
