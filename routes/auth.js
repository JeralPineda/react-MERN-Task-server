// Rutas para crear usuarios

const { Router } = require('express');
const { registerUser } = require('../controllers/auth');

const router = Router();

// Crear un usuario
// api/auth
router.post('/register', registerUser);

module.exports = router;
