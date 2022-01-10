// Rutas para crear usuarios

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear un usuario
// api/auth
router.post(
   '/',
   [
      //Midlewares
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo es obligatorio').isEmail(),
      check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      validarCampos,
   ],
   crearUsuario
);

module.exports = router;
