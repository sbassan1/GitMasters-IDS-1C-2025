const dbClient = require('../../database');
// --- GET ---

async function getAllVentas_Productos() {
  try {
       const response = await dbClient.query('SELECT * FROM v_productos vp;');
       return response.rows;
  } catch (error) {
       console.error('Error al obtener ventas de productos:', error);
       throw new Error('No se pudieron obtener las ventas de productos');
  }
}

async function getVenta_ProductoById(id) {
  try {
       const response = await dbClient.query('SELECT * FROM v_productos WHERE id = $1;', [id]);
       return response.rows[0] || null;
  } catch (error) {
       console.error('Error al obtener venta de producto por ID:', error);
       throw new Error('No se pudo obtener la venta de producto');
  }
}

async function getVenta_ProductoByIdProducto(id_producto) {
  try {
       const response = await dbClient.query('SELECT * FROM v_productos WHERE id_producto = $1;', [id_producto]);
       return response.rows[0] || null;
  } catch (error) {
       console.error('Error al obtener venta de producto por ID de producto:', error);
       throw new Error('No se pudo obtener la venta de producto');
  }
}

async function getVenta_ProductoByIdVenta(id_venta) {
    try {
        const response = await dbClient.query('SELECT * FROM v_productos WHERE id_venta = $1;', [id_venta]);
        return response.rows[0] || null;
    } catch (error) {
        console.error('Error al obtener venta de producto por ID de venta:', error);
        throw new Error('No se pudo obtener la venta de producto');
    }
}

async function getVenta_ProductoByCantidad(cantidad) {
  try {
       const response = await dbClient.query('SELECT * FROM v_productos WHERE cantidad = $1;', [cantidad]);
       return response.rows;
  } catch (error) {
       console.error('Error al obtener venta de producto por cantidad:', error);
       throw new Error('No se pudo obtener la venta de producto');
  }
}

// --- POST ---

async function createVenta_Producto(id_venta, id_producto, cantidad) {
  try {
       await dbClient.query(
        'INSERT INTO v_productos (id_venta, id_producto, cantidad) VALUES ($1, $2, $3);',
        [id_venta, id_producto, cantidad]
    );
    return await getVenta_ProductoByIdProducto(id_producto);
  } catch (error) {
       console.error('Error al crear venta de producto:', error);
       throw new Error('No se pudo crear la venta de producto');
  }
}

// --- DELETE ---

async function deleteVenta_Producto(id) {
  try {
       const response = await dbClient.query('DELETE FROM v_productos WHERE id = $1 RETURNING *;', [id]);
       return response.rows[0] || null;
  } catch (error) {
       console.error('Error al eliminar venta de producto:', error);
       throw new Error('No se pudo eliminar la venta de producto');
  }
}

// --- PUT ---

async function updateVenta_Producto(id, id_venta, id_producto, cantidad) {
  try {
       const response = await dbClient.query(
        'UPDATE v_productos SET id_venta = $1, id_producto = $2, cantidad = $3 WHERE id = $4 RETURNING *;',
        [id_venta, id_producto, cantidad, id]
    );
    return response.rows[0] || null;
  } catch (error) {
       console.error('Error al actualizar venta de producto:', error);
       throw new Error('No se pudo actualizar la venta de producto');
  }
}

module.exports = {
  getAllVentas_Productos,
  getVenta_ProductoById,
  getVenta_ProductoByIdProducto,
  getVenta_ProductoByIdVenta,
  getVenta_ProductoByCantidad,
  createVenta_Producto,
  deleteVenta_Producto,
  updateVenta_Producto
};