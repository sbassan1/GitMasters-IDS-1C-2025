const express = require('express');
const ventasQuery = require('./ventasQuery.js');

const router = express.Router();

// >>>>>>>>>>> FUNCIONES DE VALIDACION - REGEX <<<<<<<<<<

const { 
    validarNumeroRacionalPositivo, 
    validarMetodoPago, 
    validarFecha,
    validarNumeroNatural 
} = require('../utility/validaciones-regex.js');

// >>>>>>>>>>> VERIFICACIONES DE EXISTENCIA <<<<<<<<<<

const { existeUsuario } = require('../utility/verificaciones.js');

// >>>>>>>>>>> REQUESTS GET <<<<<<<<<<

router.get('/', async (req, res) => {
    try {
        const ventas = await ventasQuery.getAllVentas();

        if (!ventas || ventas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ventas.' });
        }

        res.json(ventas);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const venta = await ventasQuery.getVentaById(req.params.id);

        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada.' });
        }

        res.json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/valor/:valor', async (req, res) => {
    try {
        const ventas = await ventasQuery.getVentasByValor(req.params.valor);

        if (!ventas || ventas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ventas con ese valor.' });
        }

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/fecha/:fecha', async (req, res) => {
    try {
        const ventas = await ventasQuery.getVentasByFecha(req.params.fecha);

        if (!ventas || ventas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ventas en esa fecha.' });
        }

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cliente/:clienteId', async (req, res) => {
    try {
        const ventas = await ventasQuery.getVentasByCliente(req.params.clienteId);

        if (!ventas || ventas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ventas para ese cliente.' });
        }

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/metodo/:metodo_pago', async (req, res) => {
    try {
        const ventas = await ventasQuery.getVentasByMetodo(req.params.metodo_pago);

        if (!ventas || ventas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ventas con ese método de pago.' });
        }

        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS POST <<<<<<<<<<

router.post('/', async (req, res) => {
    try {
        const { valor, fecha, id_usuario, metodo_pago } = req.body;

        if (valor === null || valor === undefined || !fecha || !id_usuario || !metodo_pago) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const validacionValor = validarNumeroRacionalPositivo(valor);
        if (!validacionValor.ok) {
            return res.status(400).json({ message: validacionValor.message });
        }

        const validacionFecha = validarFecha(fecha);
        if (!validacionFecha.ok) {
            return res.status(400).json({ message: validacionFecha.message });
        }

        const validacionMetodoPago = validarMetodoPago(metodo_pago);
        if (!validacionMetodoPago.ok) {
            return res.status(400).json({ message: validacionMetodoPago.message });
        }

        const validacionIdUsuario = validarNumeroNatural(id_usuario);
        if (!validacionIdUsuario.ok) {
            return res.status(400).json({ message: validacionIdUsuario.message });
        }

        if (!await existeUsuario(id_usuario)) { // Verifica si el usuario existe
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const nuevaVenta = await ventasQuery.createVenta(valor, fecha, id_usuario, metodo_pago);
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// >>>>>>>>>>> REQUESTS PUT <<<<<<<<<<
router.put('/:id', async (req, res) => {
    try {
        const { valor, fecha, id_usuario, metodo_pago } = req.body;

        if (valor===null || valor===undefined || !fecha || !id_usuario || !metodo_pago) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const validacionValor = validarNumeroRacionalPositivo(valor);
        if (!validacionValor.ok) {
            return res.status(400).json({ message: validacionValor.message });
        }

        const validacionFecha = validarFecha(fecha);
        if (!validacionFecha.ok) {
            return res.status(400).json({ message: validacionFecha.message });
        }

        const validacionMetodoPago = validarMetodoPago(metodo_pago);
        if (!validacionMetodoPago.ok) {
            return res.status(400).json({ message: validacionMetodoPago.message });
        }

        const validacionIdUsuario = validarNumeroNatural(id_usuario);
        if (!validacionIdUsuario.ok) {
            return res.status(400).json({ message: validacionIdUsuario.message });
        }

        if (!await existeUsuario(id_usuario)) { // Verifica si el usuario existe
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const ventaActualizada = await ventasQuery.updateVenta(req.params.id, valor, fecha, id_usuario, metodo_pago);
        
        if (!ventaActualizada) {
            return res.status(404).json({ message: 'Venta no encontrada.' });
        }

        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;