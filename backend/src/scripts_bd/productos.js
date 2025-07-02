import dbClient from api.js


async function getAllProductos() {
    const response = await dbClient.query("SELECT * FROM Productos;");
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}

async function getProductoId(number) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.id = $1;", [number]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows[0];
}

async function getProductoNombre(nombre) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.nombre = $1;", [nombre]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows[0];
}


async function getAllProductosTipo(tipo) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.tipo = $1;", [tipo]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}

async function getAllProductosSedeId(id_sede) {
    const response = await dbClient.query("SELECT * FROM Productos p where p.sede_id = $1;", [id_sede]);
    
    if (response.rowCount === 0) {
        return undefined;
    }
    
    return response.rows;
}


async function createProducto(nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) {
    
    const response = await dbClient.query(
        `INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) VALUES (
        ($1,$2,$3,$4,$5,$6,$7);`, [nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id]
    );
    return getProductoNombre(nombre);
}

async function deleteProductoId(id_producto) {
    try {
        const response = await dbClient.query('DELETE FROM Producto p WHERE p.id=$1;',[id_producto]);
        return true;
    } catch {
        return false;
    }
    
}

async function updateProducto(id, nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) {
    
}