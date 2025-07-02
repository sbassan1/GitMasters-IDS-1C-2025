const dbClient = require('../database');

// --- GET ---



async function getAllProductos() {
    try {
        const response = await dbClient.query("SELECT * FROM Productos p;");
        return response.rows;
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
        throw new Error("No se pudieron obtener los productos");
    }
}

async function getProductoId(id) {
    try {
        const response = await dbClient.query("SELECT * FROM Productos WHERE id = $1;", [id]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener producto con ID ${id}:`, error);
        throw new Error(`No se pudo obtener el producto con ID ${id}`);
    }
}

async function getProductoNombre(nombre) {
    try {
        const response = await dbClient.query("SELECT * FROM Productos WHERE nombre = $1;", [nombre]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener producto con nombre ${nombre}:`, error);
        throw new Error(`No se pudo obtener el producto con nombre ${nombre}`);
    }
}

async function getAllProductosTipo(tipo) {
    try {
        const response = await dbClient.query("SELECT * FROM Productos WHERE tipo = $1;", [tipo]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener productos del tipo ${tipo}:`, error);
        throw new Error(`No se pudieron obtener los productos del tipo ${tipo}`);
    }
}

async function getAllProductosSedeId(sede_id) {
    try {
        const response = await dbClient.query("SELECT * FROM Productos WHERE sede_id = $1;", [sede_id]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener productos de sede ${sede_id}:`, error);
        throw new Error(`No se pudieron obtener los productos de la sede ${sede_id}`);
    }
}

// --- CREATE ---

async function createProducto(nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) {
    try {
        await dbClient.query(
            `INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id]
        );
        return await getProductoNombre(nombre);
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw new Error("No se pudo crear el producto");
    }
}

// --- DELETE ---

async function deleteProductoId(id) {
    try {
        const result = await dbClient.query("DELETE FROM Productos WHERE id = $1;", [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${id}:`, error);
        throw new Error(`No se pudo eliminar el producto con ID ${id}`);
    }
}

// --- UPDATE GENERAL ---

async function updateProducto(id, nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) {
    try {
        const result = await dbClient.query(
            `UPDATE Productos SET nombre = $2, descripcion = $3, stock = $4, precio_venta = $5,
             tipo = $6, imagen = $7, sede_id = $8 WHERE id = $1;`,
            [id, nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id]
        );
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar el producto con ID ${id}`);
    }
}

// --- ACTUALIZACIONES INDIVIDUALES ---

async function updateNombreProductoId(id, nombre) {
    try {
        const result = await dbClient.query("UPDATE Productos SET nombre = $2 WHERE id = $1;", [id, nombre]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);

    } catch (error) {
        console.error(`Error al actualizar nombre del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar el nombre del producto con ID ${id}`);
    }
}

async function updateDescripcionProductoId(id, descripcion) {
    try {
        const result = await dbClient.query("UPDATE Productos SET descripcion = $2 WHERE id = $1;", [id, descripcion]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar descripción del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar la descripción del producto con ID ${id}`);
    }
}

async function updateStockProductoId(id, stock) {
    try {
        const result = await dbClient.query("UPDATE Productos SET stock = $2 WHERE id = $1;", [id, stock]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar stock del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar el stock del producto con ID ${id}`);
    }
}

async function updatePrecioProductoId(id, precio_venta) {
    try {
        const result = await dbClient.query("UPDATE Productos SET precio_venta = $2 WHERE id = $1;", [id, precio_venta]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar precio del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar el precio del producto con ID ${id}`);
    }
}

async function updateTipoProductoId(id, tipo) {
    try {
        const result = await dbClient.query("UPDATE Productos SET tipo = $2 WHERE id = $1;", [id, tipo]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar tipo del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar el tipo del producto con ID ${id}`);
    }
}

async function updateImagenUrlProductoId(id, imagen) {
    try {
        const result = await dbClient.query("UPDATE Productos SET imagen = $2 WHERE id = $1;", [id, imagen]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar imagen del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar la imagen del producto con ID ${id}`);
    }
}

async function updateSedeProductoId(id, sede_id) {
    try {
        const result = await dbClient.query("UPDATE Productos SET sede_id = $2 WHERE id = $1;", [id, sede_id]);
        
        if (result.rowCount === 0) {
            throw new Error(`No existe producto con ID ${id}`);
        }
        
        return await getProductoId(id);
    } catch (error) {
        console.error(`Error al actualizar sede del producto ${id}:`, error);
        throw new Error(`No se pudo actualizar la sede del producto con ID ${id}`);
    }
}

module.exports = {
    getAllProductos,
    getProductoId,
    getProductoNombre,
    getAllProductosTipo,
    getAllProductosSedeId,
    createProducto,
    deleteProductoId,
    updateProducto,
    updateNombreProductoId,
    updateDescripcionProductoId,
    updateStockProductoId,
    updatePrecioProductoId,
    updateTipoProductoId,
    updateImagenUrlProductoId,
    updateSedeProductoId
};