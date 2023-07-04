const format = require("pg-format");
const pool = require("../database/conexion.js");

//GET
const getAll = async () => {
  const consulta = "SELECT * FROM usuarios";
  const { rows } = await pool.query(consulta);
  return rows;
};

//CREATE
const create = async (data) => {
  const consulta = format(
    "INSERT INTO usuarios(nombre, correo) VALUES (%L) RETURNING *",
    Object.values(data)
  );

  const { rows } = await pool.query(consulta);

  console.log(rows[0]);

  return rows[0];
};

//PUT
const update = async (data, id) => {
  const consulta = format(
    `UPDATE usuarios SET ${Object.keys(data)
      .map((item) => `${item} = '%s'`)
      .join(", ")} WHERE id = '%s' RETURNING *`,
    ...Object.values(data),
    id
  );

  const { rows } = await pool.query(consulta);
  return rows[0];
};

//DELETE
const remove = async (id) => {
  const consulta = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(consulta, [id]);
  return rows[0];
};

module.exports = { getAll, create, update, remove };
