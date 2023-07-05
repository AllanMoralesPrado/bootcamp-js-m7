CREATE DATABASE tareas;

CREATE TABLE IF NOT EXISTS tareas (
    id serial PRIMARY KEY,
    titulo varchar(255),
    descripcion varchar(255),
    completado boolean,
    usuario_id integer REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usuarios (
	id serial primary key,
	nombre varchar (255),

	correo varchar(255)
);
