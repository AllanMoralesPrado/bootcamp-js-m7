const format = require("pg-format");
const pool = require("../database/conexion.js");

//CREATE
const create = async (data) => {
  const consulta = format(
    "INSERT INTO tareas(titulo, descripcion, completado, usuario_id) VALUES (%L) RETURNING *",
    [data]
  );
};

module.exports = { create };
