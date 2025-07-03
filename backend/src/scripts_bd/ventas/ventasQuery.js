const dbClient = require('../database');

// --- GET ---

async function getAllVentas() {
    try {
        const response = await dbClient.query('SELECT * FROM ventas v;');
        return response.rows;
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        throw new Error('No se pudieron obtener las ventas');
    }
}

async function getVentaById(id) {
    try {
        const response = await dbClient.query('SELECT * FROM ventas v WHERE v.id = $1;', [id]);
        return response.rows[0] || null;
    } catch (error) {
        console.error(`Error al obtener la venta con ID ${id}:`, error);
        throw new Error(`No se pudo obtener la venta con ID ${id}`);
    }
}

async function getVentabyValor(monto) {
    try {
        const response = await dbClient.query('SELECT * FROM ventas v WHERE v.valor = $1;', [monto]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener las ventas con valor ${monto}:`, error);
        throw new Error(`No se pudieron obtener las ventas con valor ${monto}`);
    }
}

async function getVentasByFecha(fecha) {
    try {
        const response = await dbClient.query('SELECT * FROM ventas v WHERE v.fecha = $1;', [fecha]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener las ventas de la fecha ${fecha}:`, error);
        throw new Error(`No se pudieron obtener las ventas de la fecha ${fecha}`);
    }
}

async function getVentasByCliente(clienteId) {
    try {
        const response = await dbClient.query('SELECT * FROM ventas v WHERE v.cliente_id = $1;', [clienteId]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener las ventas del cliente con ID ${clienteId}:`, error);
        throw new Error(`No se pudieron obtener las ventas del cliente con ID ${clienteId}`);
    }
}

async function getVentasByMetodo(metodo_de_pago) {
    try {
        const response = await dbClient.query('SELECT * FROM ventas v WHERE v.metodo_de_pago = $1;', [metodo_de_pago]);
        return response.rows;
    } catch (error) {
        console.error(`Error al obtener las ventas con método de pago ${metodo_de_pago}:`, error);
        throw new Error(`No se pudieron obtener las ventas con método de pago ${metodo_de_pago}`);
    }
}

// --- POST ---

async function createVenta(valor, fecha, cliente_id, metodo_de_pago) {
    try {
        const result = await dbClient.query(
            'INSERT INTO ventas (valor, fecha, cliente_id, metodo_de_pago) VALUES ($1, $2, $3, $4) RETURNING *;',
            [valor, fecha, cliente_id, metodo_de_pago]
        );
        return await getVentaById(id);
    } catch (error) {
        console.error('Error al crear la venta:', error);
        throw new Error('No se pudo crear la venta');
    }
}

// --- DELETE ---

async function deleteVenta(id) {
    try {
        const result = await dbClient.query(
            'DELETE FROM ventas WHERE id = $1;', [id]);
            return result.rowCount > 0;
    } catch (error) {
        console.error(`Error al eliminar la venta con ID ${id}:`, error);
        throw new Error(`No se pudo eliminar la venta con ID ${id}`);
    }
}

// --- PUT ---

// --- PUT GENERAL ---

async function updateVenta(id, valor, fecha, cliente_id, metodo_de_pago) {
    try {
        const result = await dbClient.query(
            'UPDATE ventas SET valor = $1, fecha = $2, cliente_id = $3, metodo_de_pago = $4 WHERE id = $5 RETURNING *;',
            [valor, fecha, cliente_id, metodo_de_pago, id]
        );
        if (result.rowCount === 0) {
            throw new Error(`No se encontró la venta con ID ${id}`);
        }
        return await getVentaById(id);
    } catch (error) {
        console.error(`Error al actualizar la venta con ID ${id}:`, error);
        throw new Error(`No se pudo actualizar la venta con ID ${id}`);
    }
}

module.exports = {
    getAllVentas,
    getVentaById,
    getVentabyValor,
    getVentasByFecha,
    getVentasByCliente,
    getVentasByMetodo,
    createVenta,
    deleteVenta,
    updateVenta
};