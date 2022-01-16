// Rutas para los proyectos

const { Router } = require('express');
const { check } = require('express-validator');

const { postProyecto } = require('../controllers/proyectos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear proyectos
// api/proyectos/nuevo
router.post(
   '/nuevo',
   [
      //Midlewares
      validarJWT,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   postProyecto
);

module.exports = router;
