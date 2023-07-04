--EJECUTAR ESTOS COMANDOS DESDE SQL Shell (psql)
--(copy and paste)

--CREAR BASE DE DATOS
CREATE DATABASE tareas;

--CONECCION A BASE DE DATOS 'tareas'
\c tareas

--CREAR TABLA USUARIOS
CREATE TABLE usuarios (
	id serial primary key,
	nombre varchar (255),
	correo varchar(255)
);

--CREAR TABLA TAREAS
CREATE TABLE tareas (
	id serial primary key,
	titulo varchar(255),
	descripcion varchar (255),
	completado boolean,
	usuario_id int references usuarios (id)
);