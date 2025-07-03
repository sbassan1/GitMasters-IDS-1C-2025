const dbClient = require('../database');

// --- GET ---

async function getAllUsuarios() {
    try {
        const response = await dbClient.query('SELECT * FROM usuarios u;');
        return response.rows;
    } catch (error) {
        console.error("Error al obtener todos los usuarios:", error);
        throw new Error("No se pudieron obtener los usuarios");
    }
}

async function getUsuarioById(id) {
    try {
        const response = await dbClient.query('SELECT * FROM usuarios u WHERE u.id = $1;', [id]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener el usuario con ID ${id}:`, error);
        throw new Error(`No se pudo obtener el usuario con ID ${id}`);
    }
}

async function getUsuarioByEmail(email) {
    try {
        const response = await dbClient.query('SELECT * FROM usuarios u WHERE u.email = $1;', [email]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener el usuario con email ${email}:`, error);
        throw new Error(`No se pudo obtener el usuario con email ${email}`);
    }
}

async function getUsuarioByNombre(nombre) {
    try {
        const response = await dbClient.query('SELECT * FROM usuarios u WHERE u.nombre = $1;', [nombre]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener el usuario con nombre ${nombre}:`, error);
        throw new Error(`No se pudo obtener el usuario con nombre ${nombre}`);
    }
}

async function getUsuariosByCumpleanos(cumpleanos) {
    try {
        const response = await dbClient.query('SELECT * FROM usuarios WHERE cumpleanos = $1;', [cumpleanos]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener usuarios con cumpleaños ${cumpleanos}:`, error);
        throw new Error(`No se pudieron obtener los usuarios con cumpleaños ${cumpleanos}`);
    }
}

async function getUsuariosByInicio(fecha_inicio) {
    try {
        const response = await dbClient.query('SELECT * FROM usuarios WHERE fecha_inicio = $1;', [fecha_inicio]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener usuarios con fecha de inicio ${fecha_inicio}:`, error);
        throw new Error(`No se pudieron obtener los usuarios con fecha de inicio ${fecha_inicio}`);
    }
}

// --- POST ---

async function createUsuario(nombre, email, contrasena, cumpleanos, fecha_inicio) {
    try {
        await dbClient.query(
            `INSERT INTO usuarios (nombre, email, contrasena, cumpleanos, fecha_inicio) 
             VALUES ($1, $2, $3, $4, $5);`,
            [nombre, email, contrasena, cumpleanos, fecha_inicio]
        );
        return await getUsuarioByEmail(email);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        throw new Error("No se pudo crear el usuario");
    }
}

// --- DELETE ---

async function deleteUsuarioByEmail(email) {
    try {
        const result = await dbClient.query('DELETE FROM usuarios WHERE mail = $1;', [email]);
        return result.rowCount > 0;
    } catch (error) {
        console.error(`Error al eliminar el usuario con email ${email}:`, error);
        throw new Error(`No se pudo eliminar el usuario con email ${email}`);
    }
    
}

// --- PUT ---

// --- PUT GENERAL ---

async function updateUsuario(id, nombre, email, contrasena, cumpleanos, fecha_inicio) {
    try {
        const result = await dbClient.query(
            `UPDATE usuarios SET nombre = $2, email = $3, contrasena = $4, cumpleanos = $5, fecha_inicio = $6
             WHERE id = $1;`,
            [id, nombre, email, contrasena, cumpleanos, fecha_inicio]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró el usuario con ID ${id}`);
        }
        return await getUsuarioById(id);
    } catch (error) {
        console.error(`Error al actualizar el usuario con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el usuario con ID ${id}`);
    }
}

// --- PUTS INDIVIDUALES ---

async function updateUsuarioNombre(id, nombre) {
    try {
        const result = await dbClient.query(
            `UPDATE usuarios SET nombre = $2 WHERE id = $1;`,
            [id, nombre]
        )
        if (result.rowCount === 0) {
            throw new Error(`No se encontró el usuario con ID ${id}`);
        }
        return await getUsuarioById(id);
    } catch (error) {
        console.error(`Error al actualizar el nombre del usuario con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el nombre del usuario con ID ${id}`);
    }
}

async function updateUsuarioEmail(id, email) {
    try {
        const result = await dbClient.query(
            `UPDATE usuarios SET email = $2 WHERE id = $1;`,
            [id, email]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró el usuario con ID ${id}`);
        }
        return await getUsuarioById(id);
    } catch (error) {
        console.error(`Error al actualizar el email del usuario con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el email del usuario con ID ${id}`);
    }
}

async function updateUsuarioContrasena(id, contrasena) {
    try {
        const result = await dbClient.query(
            `UPDATE usuarios SET contrasena = $2 WHERE id = $1;`,
            [id, contrasena]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró el usuario con ID ${id}`);
        }
        return await getUsuarioById(id);
    } catch (error) {
        console.error(`Error al actualizar la contraseña del usuario con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar la contraseña del usuario con ID ${id}`);
    }
}

async function updateUsuarioCumpleanos(id, cumpleanos) {
    try {
        const result = await dbClient.query(
            `UPDATE usuarios SET cumpleanos = $2 WHERE id = $1;`,
            [id, cumpleanos]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró el usuario con ID ${id}`);
        }
        return await getUsuarioById(id);
    } catch (error) {
        console.error(`Error al actualizar el cumpleaños del usuario con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el cumpleaños del usuario con ID ${id}`);
    }
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    getUsuarioByNombre,
    getUsuariosByCumpleanos,
    getUsuariosByInicio,
    createUsuario,
    deleteUsuarioByEmail,
    updateUsuario,
    updateUsuarioNombre,
    updateUsuarioEmail,
    updateUsuarioContrasena,
    updateUsuarioCumpleanos
};