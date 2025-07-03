const express = require('express');
const venta_productosQuery = require('./v_productosQuery.js');

const router = express.Router();
// >>>>>>>>>>> REQUESTS GET <<<<<<<<<<

router.get('/', async (req, res) => {
    try {
        const v_productos = await venta_productosQuery.getAllVentas_Productos();

        if (!v_productos || v_productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos de venta.' });
        }

        res.status(200).json(v_productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const v_productos = await venta_productosQuery.getVenta_ProductoById(req.params.id);
        if (!v_productos) {
            return res.status(404).json({ message: 'Producto de venta no encontrado.' });
        }
        
        res.json(v_productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id_venta/:id_venta', async (req, res) => {
    try {
        const v_productos = await venta_productosQuery.getVenta_ProductosByIdVenta(req.params.id_venta);
        if (!v_productos || v_productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos de venta para esta venta.' });
        }
        
        res.json(v_productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id_producto/:id_producto', async (req, res) => {
    try {
        const v_productos = await venta_productosQuery.getVenta_ProductosByIdProducto(req.params.id_producto);
        if (!v_productos || v_productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos de venta para este producto.' });
        }
        
        res.json(v_productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('cantidad/:cantidad', async (req, res) => { 
    try {
        const v_productos = await venta_productosQuery.getVenta_ProductosByCantidad(req.params.cantidad);
        if (!v_productos || v_productos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos de venta con esta cantidad.' });
        }
        
        res.json(v_productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS POST <<<<<<<<<<

router.post('/', async (req, res) => {
    try {
        const { id_venta, id_producto, cantidad } = req.body;

        if (!id_venta || !id_producto || !cantidad) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const nuevaVentaProducto = await venta_productosQuery.createVenta_Producto(id_venta, id_producto, cantidad);
        res.status(201).json(nuevaVentaProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS PUT <<<<<<<<<<
router.put('/:id', async (req, res) => {
    try {
        const { id_venta, id_producto, cantidad } = req.body;
        const venta_productoActualizada = await venta_productosQuery.updateVenta_Producto(req.params.id, id_venta, id_producto, cantidad);

        if (!venta_productoActualizada) {
            return res.status(404).json({ message: 'Producto de venta no encontrado.' });
        }

        res.json(venta_productoActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});