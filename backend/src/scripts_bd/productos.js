import dbClient from api.js


async function getAllProductos() {
    const response = await dbClient.query("SELECT * FROM Productos");
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}

async function getProcutoId(number) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.id = $1", [number]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows[0];
}

async function getAllProductosTipo(tipo) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.tipo = $1", [tipo]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}

async function getAllProductosSedeId(id_sede) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.sede_id = $1", [id_sede]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}