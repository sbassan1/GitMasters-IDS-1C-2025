import dbClient from './api.js';

// --- GET ---

export async function getAllProductos() {
    const response = await dbClient.query("SELECT * FROM Productos;");
    return response.rows;
}

export async function getProductoId(id) {
    const response = await dbClient.query("SELECT * FROM Productos WHERE id = $1;", [id]);
    return response.rows[0];
}

export async function getProductoNombre(nombre) {
    const response = await dbClient.query("SELECT * FROM Productos WHERE nombre = $1;", [nombre]);
    return response.rows[0];
}

export async function getAllProductosTipo(tipo) {
    const response = await dbClient.query("SELECT * FROM Productos WHERE tipo = $1;", [tipo]);
    return response.rows;
}

export async function getAllProductosSedeId(sede_id) {
    const response = await dbClient.query("SELECT * FROM Productos WHERE sede_id = $1;", [sede_id]);
    return response.rows;
}

// --- CREATE ---

export async function createProducto(nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) {
    await dbClient.query(
        `INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id]
    );
    return getProductoNombre(nombre);
}

// --- DELETE ---

export async function deleteProductoId(id) {
    try {
        await dbClient.query("DELETE FROM Productos WHERE id = $1;", [id]);
        return true;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return false;
    }
}

// --- UPDATE GENERAL ---

export async function updateProducto(id, nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) {
    await dbClient.query(
        `UPDATE Productos SET nombre = $2, descripcion = $3, stock = $4, precio_venta = $5,
         tipo = $6, imagen = $7, sede_id = $8 WHERE id = $1;`,
        [id, nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id]
    );
    return getProductoId(id);
}

// --- ACTUALIZACIONES INDIVIDUALES ---

export async function updateNombreProductoId(id, nombre) {
    await dbClient.query("UPDATE Productos SET nombre = $2 WHERE id = $1;", [id, nombre]);
    return getProductoId(id);
}

export async function updateDescripcionProductoId(id, descripcion) {
    await dbClient.query("UPDATE Productos SET descripcion = $2 WHERE id = $1;", [id, descripcion]);
    return getProductoId(id);
}

export async function updateStockProductoId(id, stock) {
    await dbClient.query("UPDATE Productos SET stock = $2 WHERE id = $1;", [id, stock]);
    return getProductoId(id);
}

export async function updatePrecioProductoId(id, precio_venta) {
    await dbClient.query("UPDATE Productos SET precio_venta = $2 WHERE id = $1;", [id, precio_venta]);
    return getProductoId(id);
}

export async function updateTipoProductoId(id, tipo) {
    await dbClient.query("UPDATE Productos SET tipo = $2 WHERE id = $1;", [id, tipo]);
    return getProductoId(id);
}

export async function updateImagenUrlProductoId(id, imagen) {
    await dbClient.query("UPDATE Productos SET imagen = $2 WHERE id = $1;", [id, imagen]);
    return getProductoId(id);
}

export async function updateSedeProductoId(id, sede_id) {
    await dbClient.query("UPDATE Productos SET sede_id = $2 WHERE id = $1;", [id, sede_id]);
    return getProductoId(id);
}
