// Rutas para las tareas

const { Router } = require('express');
const { check } = require('express-validator');

const { crearTarea } = require('../controllers/tareas');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear una tarea
// api/tareas
router.post(
   '/',
   [
      // middlewares
      validarJWT,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   crearTarea
);

module.exports = router;
