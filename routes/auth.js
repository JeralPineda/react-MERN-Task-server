// Rutas para crear usuarios

const { Router } = require('express');
const { loginUsuario } = require('../controllers/auth');

const router = Router();

router.post('/', loginUsuario);

module.exports = router;
