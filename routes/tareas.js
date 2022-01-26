// Rutas para las tareas

const { Router } = require('express');
const { check } = require('express-validator');

const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require('../controllers/tareas');

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

// Obtener tareas por proyecto
// api/tareas/:id
router.get(
   '/:proyecto',
   [
      // middlewares
      validarJWT,
      check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   obtenerTareas
);

// Actualizar una tarea por su id
// api/tareas/:id
router.put(
   '/:id',
   [
      //middlewares
      validarJWT,
      check('id', 'No es un id de Mongo valido').isMongoId(),
      validarCampos,
   ],
   actualizarTarea
);

// Eliminar una tarea por su id
// api/tareas/:id
router.delete(
   '/:id',
   [
      //middlewares
      validarJWT,
      check('id', 'No es un id de Mongo valido').isMongoId(),
      check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   eliminarTarea
);

module.exports = router;
