const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '765441',
    database:'tareas',
    port:5432,
};

const pool = new Pool(config);

const getDate = async () => {
	const result = await pool.query("SELECT NOW()");
	return result;
};

// Paso 1
const consultar = async (ruta) => {
    // Paso 2
    try {
        const result = await pool.query("SELECT * FROM $1", ruta);
        return result.rows;
    } catch (error) {
        // Paso 3
        console.log(error.code);
        return error;
    }
};


const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO tareas values($1, $2, $3, $4, $5)",
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};

const editar = async (datos) => {
    // Paso 2
    const consulta = {
        text: ` UPDATE  tareas SET
                        nombre = $1,
                        series = $2,
                        repeticiones = $3,
                        descanso = $4
                WHERE nombre = $1 
                RETURNING *`,
        values: datos,
    };
    // Paso 3
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const eliminar = async (nombre) => {
    try {
        const result = await pool.query(
            `DELETE FROM tareas WHERE nombre = '${nombre}'`
        );
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};



module.exports = { getDate, insertar, consultar, editar, eliminar };