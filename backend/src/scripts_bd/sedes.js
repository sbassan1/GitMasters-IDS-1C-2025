import dbClient from api.js

async function getAllSedes() {
    const response = await dbClient.query("SELECT * FROM Sedes");
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}

async function getSedeId(id) {
    const response = await dbClient.query("SELECT * FROM Sedes s WHERE s.id = $1", [id]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows[0];
}

asy