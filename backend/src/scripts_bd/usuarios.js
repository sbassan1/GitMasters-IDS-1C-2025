import dbClient from api.js


async function getAllUsuarios() {
    const response = await dbClient.query("SELECT * FROM Usuarios")
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows;
}

async function getUsuarioId() {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.id = $1", [number])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

async function getUsuarioNombre() {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.nombre = $1", [number])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}
async function getUsuarioEmail() {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.email = $1", [number])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

async function getUsuarioContrasena() {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.contrasena = $1", [number])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

async function getUsuarioCumpleanos() {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.cumpleanos = $1", [number])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}