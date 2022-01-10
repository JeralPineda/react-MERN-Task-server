// Rutas para crear usuarios

const { Router } = require('express');
const { crearUsuario } = require('../controllers/usuarios');

const router = Router();

// Crear un usuario
// api/auth
router.post('/register', crearUsuario);

module.exports = router;
