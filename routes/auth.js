// Rutas para iniciar sesión

const { Router } = require('express');
const { check } = require('express-validator');

const { IniciarSesion } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear un usuario
// api/auth
router.post(
   '/',
   [
      //Midlewares
      check('email', 'El correo es obligatorio').isEmail(),
      check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
      validarCampos,
   ],
   IniciarSesion
);

module.exports = router;
