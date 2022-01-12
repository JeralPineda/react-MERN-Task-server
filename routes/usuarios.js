// Rutas para crear usuarios

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, crearUsuarioGoogle } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear un usuario
// api/usuarios
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

// Crear usuario con google
// api/usuarios/google
router.post('/google-register', [check('id_token', 'El id_token es necesario').not().isEmpty(), validarCampos], crearUsuarioGoogle);

module.exports = router;
