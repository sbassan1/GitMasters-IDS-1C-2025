const productosQuery = require('../productos/productosQuery.js');
const ventasQuery = require('../ventas/ventasQuery.js');
const sedesQuery = require('../sedes/sedesQuery.js');
const usuariosQuery = require('../usuarios/usuariosQuery.js');

async function existeProducto(id_producto) {
    const producto = await productosQuery.getProductoId(id_producto);
    return !!producto;
}

async function existeVenta(id_venta) {
    const venta = await ventasQuery.getVentaById(id_venta);
    return !!venta;
}

async function existeSede(id_sede) {
    const sede = await sedesQuery.getSedeById(id_sede);
    return !!sede;
}  

async function existeUsuario(id_usuario) {
    const usuario = await usuariosQuery.getUsuarioById(id_usuario);
    return !!usuario;
}

module.exports = {
    existeProducto,
    existeVenta,
    existeSede,
    existeUsuario
};