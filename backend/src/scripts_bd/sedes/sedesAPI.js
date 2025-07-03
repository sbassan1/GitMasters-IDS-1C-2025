const express = require('express');
const sedesQuery = require('./sedesQuery.js');

const router = express.Router();
// >>>>>>>>>>> REQUESTS GET <<<<<<<<<<

router.get('/', async (req, res) => {
  try {
    const sedes = await sedesQuery.getAllSedes();

    if (!sedes || sedes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron sedes.' });
    }

    res.json(sedes);
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const sede = await sedesQuery.getSedeById(req.params.id);

        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sede);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/nombre/:nombre', async (req, res) => {
    try {
        const sede = await sedesQuery.getSedeByNombre(req.params.nombre);

        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sede);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/horarios/:horarios', async (req, res) => {
    try {
        const sedes = await sedesQuery.getSedeByHorarios(req.params.horarios);

        if (!sedes || sedes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron sedes con esos horarios.' });
        } 

        res.json(sedes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/dias_abiertos/:dias_abiertos', async (req, res) => {
    try {
        const sedes = await sedesQuery.getSedeByDiasAbiertos(req.params.dias_abiertos);

        if (!sedes || sedes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron sedes con esos días abiertos.' });
        } 

        res.json(sedes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/direccion/:direccion', async (req, res) => {
    try {
        const sedes = await sedesQuery.getSedeByDireccion(req.params.direccion);

        if (!sedes || sedes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron sedes con esa dirección.' });
        } 

        res.json(sedes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/telefono/:telefono', async (req, res) => {
    try {
        const sede = await sedesQuery.getSedeByTelefono(req.params.telefono);
        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sede);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/dias_restock/:dias_restock', async (req, res) => {
    try {
        const sedes = await sedesQuery.getSedeByDiasRestock(req.params.dias_restock);

        if (!sedes || sedes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron sedes con esos días de restock.' });
        } 

        res.json(sedes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS POST <<<<<<<<<<

router.post('/', async (req, res) => {
    try {
        const { nombre, horarios, dias_abiertos, direccion, dias_restock, telefono } = req.body;

        if (!nombre || !horarios || !dias_abiertos || !direccion || !dias_restock || !telefono) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const nuevaSede = await sedesQuery.createSede(nombre, horarios, dias_abiertos, direccion, dias_restock, telefono);
        res.status(201).json(nuevaSede);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS PUT <<<<<<<<<<
// >>>>>>>>>>> REQUESTS PUT GENERAL <<<<<<<<<<

router.put('/:id', async (req, res) => {
    try {
        const { nombre, horarios, dias_abiertos, direccion, dias_restock, telefono } = req.body;

        if (!nombre || !horarios || !dias_abiertos || !direccion || !dias_restock || !telefono) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const sedeActualizada = await sedesQuery.updateSede(req.params.id, nombre, horarios, dias_abiertos, direccion, dias_restock, telefono);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS PUT ESPECIFICOS <<<<<<<<<<

router.put('/nombre/:id', async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'Falta el nombre.' });
        }

        const sedeActualizada = await sedesQuery.updateSedeNombre(req.params.id, nombre);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/horarios/:id', async (req, res) => {
    try {
        const { horarios } = req.body;

        if (!horarios) {
            return res.status(400).json({ message: 'Faltan los horarios.' });
        }

        const sedeActualizada = await sedesQuery.updateSedeHorarios(req.params.id, horarios);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/dias_abiertos/:id', async (req, res) => {
    try {
        const { dias_abiertos } = req.body;

        if (!dias_abiertos) {
            return res.status(400).json({ message: 'Faltan los días abiertos.' });
        }

        const sedeActualizada = await sedesQuery.updateSedeDiasAbiertos(req.params.id, dias_abiertos);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/direccion/:id', async (req, res) => {
    try {
        const { direccion } = req.body;

        if (!direccion) {
            return res.status(400).json({ message: 'Falta la dirección.' });
        }

        const sedeActualizada = await sedesQuery.updateSedeDireccion(req.params.id, direccion);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/dias_restock/:id', async (req, res) => {
    try {
        const { dias_restock } = req.body;

        if (!dias_restock) {
            return res.status(400).json({ message: 'Faltan los días de restock.' });
        }

        const sedeActualizada = await sedesQuery.updateSedeDiasRestock(req.params.id, dias_restock);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/telefono/:id', async (req, res) => {
    try {
        const { telefono } = req.body;

        if (!telefono) {
            return res.status(400).json({ message: 'Falta el teléfono.' });
        }

        const sedeActualizada = await sedesQuery.updateSedeTelefono(req.params.id, telefono);
        
        if (!sedeActualizada) {
            return res.status(404).json({ message: 'Sede no encontrada.' });
        }

        res.json(sedeActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;