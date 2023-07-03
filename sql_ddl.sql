

CREATE TABLE tareas (
	id serial primary key,
	titulo varchar(255),
	descripcion varchar (255),
	completado boolean,
	usuario_id int references usuarios (id)
);

CREATE TABLE usuarios (
	id serial primary key,
	nombre varchar (255),
	correo varchar(255)
);