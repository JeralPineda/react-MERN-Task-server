// Rutas para iniciar sesión

const { Router } = require('express');
const { check } = require('express-validator');

const { iniciarSesion, iniciarSesionGoogle } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// iniciar sesión con correo y password
// api/auth
router.post(
   '/',
   [
      //Midlewares
      check('email', 'El correo es obligatorio').isEmail(),
      check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      validarCampos,
   ],
   iniciarSesion
);

// Iniciar sesión con google
// api/usuarios/google
router.post('/google', [check('id_token', 'El id_token es necesario').not().isEmpty(), validarCampos], iniciarSesionGoogle);

module.exports = router;
