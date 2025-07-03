const dbClient = require('../database');

// --- GET ---

async function getAllSedes() {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s;');
        return response.rows;
    } catch (error) {
        console.error('Error al obtener todas las sedes:', error);
        throw new Error('No se pudieron obtener las sedes');
    }
}

async function getSedeById(id) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.id = $1;', [id]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener la sede por ID ${id}:`, error);
        throw new Error(`No se pudo obtener la sede con ID ${id}`);
    }
}

async function getSedeByNombre(nombre) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.nombre = $1;', [nombre]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener la sede por nombre ${nombre}:`, error);
        throw new Error(`No se pudo obtener la sede con nombre ${nombre}`);
    }
}

async function getSedebyHorarios(horarios) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.horarios = $1;', [horarios]);
        return response.rows; // Puede haber más de una sede con el mismo horario
    } catch (error) {
        console.error(`Error al obtener la sede por horarios ${horarios}:`, error);
        throw new Error(`No se pudo obtener la sede con horarios ${horarios}`);
    }
}

async function getSedeByDiasAbiertos(dias_abiertos) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.dias_abiertos = $1;', [dias_abiertos]);
        return response.rows; // Puede haber más de una sede con los mismos días abiertos
    } catch (error) {
        console.error(`Error al obtener la sede por días abiertos ${dias_abiertos}:`, error);
        throw new Error(`No se pudo obtener la sede con días abiertos ${dias_abiertos}`);
    }
}

async function getSedebyTelefono(telefono) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.telefono = $1;', [telefono]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener la sede por teléfono ${telefono}:`, error);
        throw new Error(`No se pudo obtener la sede con teléfono ${telefono}`);
    }
}

async function getSedeByDireccion(direccion) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.direccion = $1;', [direccion]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener la sede por dirección ${direccion}:`, error);
        throw new Error(`No se pudo obtener la sede con dirección ${direccion}`);
    }
}

async function getSedeByRestock(dias_restock) {
    try {
        const response = await dbClient.query('SELECT * FROM sedes s WHERE s.dias_restock = $1;', [dias_restock]);
        return response.rows; // Puede haber más de una sede con el mismo día de restock
    } catch (error) {
        console.error(`Error al obtener la sede por días de restock ${dias_restock}:`, error);
        throw new Error(`No se pudo obtener la sede con días de restock ${dias_restock}`);
    }
}

// --- POST ---

async function createSede(nombre, horarios, dias_abiertos, direccion, dias_restock, telefono) {
    try {
        await dbClient.query(
            'INSERT INTO sedes (nombre, horarios, dias_abiertos, direccion, dias_restock, telefono) VALUES ($1, $2, $3, $4, $5, $6);',
            [nombre, horarios, dias_abiertos, direccion, dias_restock, telefono]
        );
        return await getSedeByNombre(nombre);
    } catch (error) {
        console.error('Error al crear la sede:', error);
        throw new Error('No se pudo crear la sede');
    }
}

// --- DELETE ---

async function deleteSedeByNombre(nombre) {
    try {
        const result = await dbClient.query(
            'DELETE FROM sedes WHERE nombre = $1;', [nombre]);
            return result.rowCount > 0;
    } catch (error) {
        console.error(`Error al eliminar la sede por nombre ${nombre}:`, error);
        throw new Error(`No se pudo eliminar la sede con nombre ${nombre}`);
    }
}

// --- PUT ---

// --- PUT GENERAL ---

async function updateSede(id, nombre, horarios, dias_abiertos, direccion, dias_restock, telefono) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET nombre = $1, horarios = $2, dias_abiertos = $3, direccion = $4, dias_restock = $5, telefono = $6 WHERE id = $7;',
            [nombre, horarios, dias_abiertos, direccion, dias_restock, telefono, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar la sede con ID ${id}`);
    }
}

// --- PUTS INDIVIDUALES ---

async function updateSedeNombre(id, nombre) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET nombre = $1 WHERE id = $2;',
            [nombre, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar el nombre de la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el nombre de la sede con ID ${id}`);
    }
}

async function updateSedeHorarios(id, horarios) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET horarios = $1 WHERE id = $2;',
            [horarios, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar los horarios de la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar los horarios de la sede con ID ${id}`);
    }
}

async function updateSedeDiasAbiertos(id, dias_abiertos) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET dias_abiertos = $1 WHERE id = $2',
            [dias_abiertos, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar los días abiertos de la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar los días abiertos de la sede con ID ${id}`);
    }
}

async function updateSedeDireccion(id, direccion) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET direccion = $1 WHERE id = $2 ;',
            [direccion, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar la dirección de la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar la dirección de la sede con ID ${id}`);
    }
}

async function updateSedeDiasRestock(id, dias_restock) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET dias_restock = $1 WHERE id = $2;',
            [dias_restock, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar los días de restock de la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar los días de restock de la sede con ID ${id}`);
    }
}

async function updateSedeTelefono(id, telefono) {
    try {
        const result = await dbClient.query(
            'UPDATE sedes SET telefono = $1 WHERE id = $2;',
            [telefono, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la sede con ID ${id}`);
        }
        return await getSedeById(id);
    } catch (error) {
        console.error(`Error al actualizar el teléfono de la sede con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el teléfono de la sede con ID ${id}`);
    }
}

module.exports = {
    getAllSedes,
    getSedeById,
    getSedeByNombre,
    getSedebyHorarios,
    getSedeByDiasAbiertos,
    getSedebyTelefono,
    getSedeByDireccion,
    getSedeByRestock,
    createSede,
    deleteSedeByNombre,
    updateSede,
    updateSedeNombre,
    updateSedeHorarios,
    updateSedeDiasAbiertos,
    updateSedeDireccion,
    updateSedeDiasRestock,
    updateSedeTelefono
};
