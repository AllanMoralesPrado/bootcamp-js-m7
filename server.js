const http = require('http');
const url = require('url');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
// Configura la conexión a la base de datos PostgreSQL
const dbConfig = {
  user: 'admin',
  host: 'localhost',
  database: 'tareas',
  password: 'giova7915',
  port: 5432
};
// Crea una instancia de Express
const app = express();

// Configura el middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Crea un pool de clientes para manejar las conexiones a la base de datos
const pool = new pg.Pool(dbConfig);

// Función de ayuda para ejecutar consultas SQL en la base de datos
function query(sql, params, callback) {
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar a la base de datos', err);
      return;
    }
    
    client.query(sql, params, (err, result) => {
      done();
      
      if (err) {
        console.error('Error al ejecutar la consulta', err);
        return;
      }
      
      callback(result.rows);
    });
  });
}

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  
  query(sql, [], (rows) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(rows));
  });
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, correo) VALUES ($1, $2)';
  const params = [nombre, correo];
  
  query(sql, params, () => {
    res.statusCode = 201;
    res.end('Usuario creado exitosamente');
  });
});

// Ruta para actualizar un usuario existente
app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, correo } = req.body;
  const sql = 'UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3';
  const params = [nombre, correo, id];
  
  query(sql, params, () => {
    res.end('Usuario actualizado exitosamente');
  });
});

// Ruta para eliminar un usuario existente
app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM usuarios WHERE id = $1';
  const params = [id];
  
  query(sql, params, () => {
    res.end('Usuario eliminado exitosamente');
  });
});
// Ruta para obtener todas las tareas
app.get('/tareas', (req, res) => {
    const sql = 'SELECT * FROM tareas';
    
    query(sql, [], (rows) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(rows));
    });
  });

 // Ruta para crear una nueva tarea
app.post('/tareas', (req, res) => {
    const { titulo, descripcion, completada, usuario_id } = req.body;
    const sql = 'INSERT INTO tareas (titulo, descripcion, completada, usuario_id) VALUES ($1, $2, $3, $4)';
    const params = [titulo, descripcion, completada, usuario_id];
    
    query(sql, params, () => {
      res.statusCode = 201;
      res.end('Tarea creada exitosamente');
    });
  });
  
  // Ruta para actualizar una tarea existente
  app.put('/tareas/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, completada, usuario_id } = req.body;
    const sql = 'UPDATE tareas SET titulo = $1, descripcion = $2, completada = $3, usuario_id = $4 WHERE id = $5';
    const params = [titulo, descripcion, completada, usuario_id, id];
    
    query(sql, params, () => {
      res.end('Tarea actualizada exitosamente');
    });
  });
  
  // Ruta para eliminar una tarea existente
  app.delete('/tareas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM tareas WHERE id = $1';
    const params = [id];
    
    query(sql, params, () => {
      res.end('Tarea eliminada exitosamente');
    });
  });
  
  // Ruta para asignar una tarea a un usuario
  app.post('/tareas/:id/usuarios/:usuario_id', (req, res) => {
    const tareaId = req.params.id;
    const usuarioId = req.params.usuario_id;
    const sql = 'UPDATE tareas SET usuario_id = $1 WHERE id = $2';
    const params = [usuarioId, tareaId];
    
    query(sql, params, () => {
      res.end('Tarea asignada exitosamente al usuario');
    });
  });
  

// Inicia el servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});