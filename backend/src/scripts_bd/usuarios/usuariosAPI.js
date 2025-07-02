const express = require('express');
const usuariosQuery = require('./usuariosQuery.js');

const router = express.Router();
// >>>>>>>>>>> REQUESTS GET <<<<<<<<<<

router.get('/', async (req, res) =>{
    try {
        const usuarios = await usuariosQuery.getAllUsuarios();

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios.' });
        }

        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const usuario = await usuariosQuery.getUsuarioById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/email/:email', async (req, res) => {
    try {
        const usuario = await usuariosQuery.getUsuarioByEmail(req.params.email);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/nombre/:nombre', async (req, res) => {
    try {
        const usuario = await usuariosQuery.getUsuarioByNombre(req.params.nombre);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cumpleanos/:cumpleanos', async (req, res) => {
    try {
        const usuario = await usuariosQuery.getUsuarioByCumpleanos(req.params.cumpleanos);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/inicio/:fecha_inicio', async (req, res) => {
    try {
        const usuario = await usuariosQuery.getUsuarioByFechaInicio(req.params.fecha_inicio);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS POST <<<<<<<<<<

router.post('/', async (req, res) => {
    try {
        const { nombre, email, contrasena, cumpleanos, fecha_inicio } = req.body;

        if (!nombre || !email || !contrasena || !cumpleanos || !fecha_inicio) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const nuevoUsuario = await usuariosQuery.createUsuario(nombre, email, contrasena, cumpleanos, fecha_inicio);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS PUT <<<<<<<<<<
// >>>>>>>>>>> REQUESTS PUT GENERAL <<<<<<<<<<

router.put('/:id', async (req, res) => {
    try {
        const { nombre, email, contrasena, cumpleanos, fecha_inicio } = req.body;

        if (!nombre || !email || !contrasena || !cumpleanos || !fecha_inicio) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const usuarioActualizado = await usuariosQuery.updateUsuario(req.params.id, nombre, email, contrasena, cumpleanos, fecha_inicio);

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS PUT ESPECIFICOS <<<<<<<<<<

router.put('/email/:id', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Falta el email.' });
        }

        const usuarioActualizado = await usuariosQuery.updateUsuarioEmail(req.params.id, email);

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/nombre/:id', async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'Falta el nombre.' });
        }

        const usuarioActualizado = await usuariosQuery.updateUsuarioNombre(req.params.id, nombre);

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/cumpleanos/:id', async (req, res) => {
    try {
        const { cumpleanos } = req.body;

        if (!cumpleanos) {
            return res.status(400).json({ message: 'Falta la fecha de cumpleaños.' });
        }

        const usuarioActualizado = await usuariosQuery.updateUsuarioCumpleanos(req.params.id, cumpleanos);

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/contrasena/:id', async (req, res) => {
    try {
        const { contrasena } = req.body;

        if (!contrasena) {
            return res.status(400).json({message: 'Ingrese una contraseña.'});
        }

        const usuarioActualizado = await usuariosQuery.updateUsuarioContrasena(req.params.id, contrasena);

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// >>>>>>>>>>> REQUESTS DELETE <<<<<<<<<<

router.delete('/email/:email', async (req, res) => {
    try {
        const usuarioEliminado = await usuariosQuery.deleteUsuarioByEmail(req.params.email);

        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;