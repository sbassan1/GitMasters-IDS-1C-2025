const express = require('express');
const productosQuery = require('./productosQuery.js');

const router = express.Router();
// >>>>>>>>>>> REQUESTS DE TIPO GET <<<<<<<<<<<

router.get('/', async (req, res) => {
    try {
        const prod = await productosQuery.getAllProductos();
        
        if (!prod || prod.length === 0) {
            return res.status(404).json({ error: "No hay productos" });
        }
        
        res.json(prod);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const prod = await productosQuery.getProductoId(req.params.id);
        
        if (!prod) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        res.json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:nombre', async (req,res) => {
    try {
        const prod = await productosQuery.getProductoNombre(req.params.nombre);
        
        if (!prod) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        res.json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/:tipo', async (req,res) => {
    try {
        const prod = await productosQuery.getAllProductosTipo(req.params.tipo);
        
        if (!prod || prod.length === 0) {
            return res.status(404).json({ error: "No hay productos de ese tipo" });
        }
        
        res.json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/sede/:sede_id', async (req,res) => {
    try {
        const prod = await productosQuery.getAllProductosSedeId(req.params.sede_id);
        
        if (!prod || prod.length === 0) {
            return res.status(404).json({ error: "No hay productos en esa sede" });
        }
        
        res.json(prod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// >>>>>>>>>>> REQUESTS DE TIPO CREATE <<<<<<<<<<<



// IMPORTANTE PARA QUE FUNCIONE
module.exports = router;