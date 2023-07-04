const format = require("pg-format");
const pool = require("../database/conexion.js");

//CREATE (SIN TERMINAR NI PROBAR! POR SI ACASO)
const create = async (data) => {
  const consulta = format(
    "INSERT INTO tareas(titulo, descripcion, completado, usuario_id) VALUES (%L) RETURNING *",
    [data]
  );
};

module.exports = { create };
