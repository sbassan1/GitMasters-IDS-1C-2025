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

router.get('/id/:id', async (req, res) => {
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

router.get('/nombre/:nombre', async (req,res) => {
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

router.get('/tipo/:tipo', async (req,res) => {
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


// >>>>>>>>>>> REQUESTS POST <<<<<<<<<<<

router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id } = req.body;

        if (!nombre || !descripcion || !stock || !precio_venta || !tipo || !imagen || !sede_id ) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const nuevoProducto = await productosQuery.createProducto(nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id );
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// >>>>>>>>>>> REQUESTS PUT GENERAL <<<<<<<<<<<

router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id } = req.body;

        if (!nombre || !descripcion || !stock || !precio_venta || !tipo || !imagen || !sede_id) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const productoActualizado = await productosQuery.updateProducto(req.params.id, nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS PUT <<<<<<<<<<<

router.put('/nombre/:id', async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'Falta el nombre.' });
        }

        const productoActualizado = await productosQuery.updateNombreProductoId(req.params.id, nombre);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/descripcion/:id', async (req, res) => {
    try {
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({ message: 'Falta la descripcion.' });
        }

        const productoActualizado = await productosQuery.updateDescripcionProductoId(req.params.id, descripcion);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/stock/:id', async (req, res) => {
    try {
        const { stock } = req.body;

        if (!stock) {
            return res.status(400).json({ message: 'Falta el stock.' });
        }

        const productoActualizado = await productosQuery.updateStockProductoId(req.params.id, stock);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/precio/:id', async (req, res) => {
    try {
        const { precio } = req.body;

        if (!precio) {
            return res.status(400).json({ message: 'Falta el precio.' });
        }

        const productoActualizado = await productosQuery.updatePrecioProductoId(req.params.id, precio);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/tipo/:id', async (req, res) => {
    try {
        const { tipo } = req.body;

        if (!tipo) {
            return res.status(400).json({ message: 'Falta el tipo.' });
        }

        const productoActualizado = await productosQuery.updateTipoProductoId(req.params.id, tipo);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/imagen/:id', async (req, res) => {
    try {
        const { imagen } = req.body;

        if (!imagen) {
            return res.status(400).json({ message: 'Falta el imagen.' });
        }

        const productoActualizado = await productosQuery.updateImagenUrlProductoId(req.params.id, imagen);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/sede/:id', async (req, res) => {
    try {
        const { sede } = req.body;

        if (!sede) {
            return res.status(400).json({ message: 'Falta la sede.' });
        }

        const productoActualizado = await productosQuery.updateSedeProductoId(req.params.id, sede);

        if (!productoActualizado) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// IMPORTANTE PARA QUE FUNCIONE
module.exports = router;