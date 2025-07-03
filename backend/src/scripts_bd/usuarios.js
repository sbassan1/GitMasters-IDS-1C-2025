const { dbClient } = require("../database");


async function getAllUsuarios() {
    const response = await dbClient.query("SELECT * FROM Usuarios")
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows;
}

async function getUsuarioId(number) {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.id = $1", [number])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

async function getUsuarioNombre(nombre) {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.nombre = $1", [nombre])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}
async function getUsuarioEmail(email) {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.email = $1", [email])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

async function getUsuarioContrasena(contrasena) {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.contrasena = $1", [contrasena])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

async function getUsuarioCumpleanos(cumpleanos) {
    const response = await dbClient.query("SELECT * FROM Usuarios u WHERE u.cumpleanos = $1", [cumpleanos])
    
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}