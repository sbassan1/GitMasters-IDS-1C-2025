const express = require('express');
const ventasQuery = require('./ventasQuery.js');

const router = express.Router();
// >>>>>>>>>>> REQUESTS GET <<<<<<<<<<

router.get('/', async (req, res) => {
    try {
        const ventas = await ventasQuery.getAllVentas();

        if (!usuarios || ventas.length === 0) {
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

router.get('/metodo/:metodo_de_pago', async (req, res) => {
    try {
        const ventas = await ventasQuery.getVentasByMetodo(req.params.metodo_de_pago);

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
        const { valor, fecha, cliente_id, metodo_de_pago } = req.body;

        if (!valor || !fecha || !cliente_id || !metodo_de_pago) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const nuevaVenta = await ventasQuery.createVenta(valor, fecha, cliente_id, metodo_de_pago);
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// >>>>>>>>>>> REQUESTS PUT <<<<<<<<<<
router.put('/:id', async (req, res) => {
    try {
        const { valor, fecha, cliente_id, metodo_de_pago } = req.body;

        if (!valor || !fecha || !cliente_id || !metodo_de_pago) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const ventaActualizada = await ventasQuery.updateVenta(req.params.id, valor, fecha, cliente_id, metodo_de_pago);
        
        if (!ventaActualizada) {
            return res.status(404).json({ message: 'Venta no encontrada.' });
        }

        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});