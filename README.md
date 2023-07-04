# bootcamp-js-m7

Proyecto extraordinario que consiste en la creación de una API utilizando Node.js y PostgreSQL para gestionar tareas

## OBJETIVO

Crear una API utilizando Node.js y PostgreSQL para gestionar tareas. La API debe permitir crear, leer, actualizar y eliminar tareas, y también debe tener una lógica de negocio que permita asignar tareas a los usuarios.

## REQUERIMIENTOS

### Configuración de la base de datos

Instala PostgreSQL en tu máquina si aún no lo has hecho.

-   Crea una base de datos llamada "tareas" en PostgreSQL.
-   Crea dos tablas: "tareas" y "usuarios" con los siguientes campos: - Tabla "tareas": - id: un número entero autoincremental (clave primaria) - titulo: cadena de caracteres (título de la tarea) - descripcion: cadena de caracteres (descripción de la
    tarea) - completada: booleano (indica si la tarea está completada
    o no) - usuario_id: un número entero (ID del usuario asignado a
    la tarea) - Tabla "usuarios": - id: un número entero autoincremental (clave primaria) - nombre: cadena de caracteres (nombre del usuario) - correo: cadena de caracteres (correo electrónico del
    usuario)

### Crea un nuevo directorio para tu proyecto

-   Inicializa un proyecto de Node.js en el directorio utilizando npm init.
-   Instala los siguientes paquetes utilizando npm install:
-   pg: para conectarse y ejecutar consultas a la base de datos
    PostgreSQL.

### Configuración del servidor

-   Crea un archivo server.js en el directorio raíz de tu proyecto.
-   Importa los módulos necesarios y configura el servidor HTTP
    utilizando el módulo http de Node.js.

### Creación de las rutas de la API

-   Crea las rutas necesarias para realizar las operaciones CRUD (crear,
    leer, actualizar y eliminar tareas) y también para asignar tareas a
    usuarios.
-   Utiliza consultas SQL para interactuar con la base de datos
    PostgreSQL y realizar las operaciones correspondientes.
-   Implementa la lógica de negocio para asignar tareas a usuarios.

### Prueba de la API

-   Utiliza una herramienta como Postman o curl para realizar solicitudes
    HTTP y probar la funcionalidad de la API.
-   Verifica que puedas crear, leer, actualizar y eliminar tareas
    correctamente, y que también puedas asignar tareas a usuarios.

#### SOLUCIÓN

Avance: Creación de base de datos (_Juan Oh_)

Modificación de la creación de tablas para asegurar la existencia la referencia al Id de Usuario. No considere ver casos de "ON DELETE".

```SQL
CREATE TABLE IF NOT EXISTS tareas (
    id serial PRIMARY KEY,
    titulo varchar(255),
    descripcion varchar(255),
    completado boolean,
    usuario_id integer REFERENCES usuarios(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
	id serial primary key,
	nombre varchar (255),
	correo varchar(255)
);
```

Avance: Función que maneja la BD en query.js. No me la pude haciéndolo sincrónico por lo que lo cambie todo a asíncrono y quedo más simple.

tarea.js y usuario.js ahora son clases y funcionan igual a lo visto en el Modulo 8

Use funcionUsuario.js y funcionTarea.js como un area de pruebas.

- usuario.insert(): agrega al usuario a la base de datos.
- Usuario.Fin(id): función estática que retorna a el usuario según id.
- Usuario.All(): función estática que retorna un arreglo con todos los usuarios.
- Usuario.Actualizar(id, ...args): función estática que recibe un id y un conjunto de parámetros para actualizar en la base de datos según el id. Los valóres nulos, quedan con los valores originales.
- Usuario.Delete(id): función estática que recibe un id y elimina a dicho elemento de la base de datos.