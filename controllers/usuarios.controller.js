const {
  create,
  getAll,
  update,
  remove,
} = require("../models/usuarios.model.js");

//OBTENER USUARIOS
const getUsers = async () => {
  try {
    const users = getAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

//CREAR USUARIO
const createUser = async (data) => {
  try {
    for (const key in data) {
      if (data[key].trim() === "") {
        throw { code: 400, message: "Todos los campos son obligatorios" };
      }
    }
    const newUser = await create(data);
    return {
      ok: true,
      status: 201,
      message: "Usuario creado con éxito",
      data: newUser,
    };
  } catch (error) {
    return { ok: false, status: error.code, message: error.message };
  }
};

//MODIFICAR USUARIO
const updateUser = async (data, id) => {
  try {
    const updatedUser = await update(data, id);

    if (!updatedUser)
      throw {
        code: 404,
        message: "El usuario que ha intentado modificar no existe",
      };

    return {
      ok: true,
      status: 200,
      message: "Usuario actualizado con éxito",
      data: updatedUser,
    };
  } catch (error) {
    return { ok: false, status: error.code, message: error.message };
  }
};

//ELIMINAR USUARIO
const removeUser = async (id) => {
  try {
    const deletedUser = await remove(id);

    if (!deletedUser)
      throw {
        code: 404,
        message: "El usuario que ha intentado eliminar no existe",
      };

    return {
      ok: true,
      status: 200,
      message: "Usuario eliminado con éxito",
      data: deletedUser,
    };
  } catch (error) {
    return { ok: false, status: error.code, message: error.message };
  }
};

module.exports = { getUsers, createUser, updateUser, removeUser };
