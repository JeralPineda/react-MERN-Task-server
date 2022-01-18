// Rutas para los proyectos

const { Router } = require('express');
const { check } = require('express-validator');

const { postProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } = require('../controllers/proyectos');
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

// Obtener todos los proyectos
// api/proyectos
router.get('/', validarJWT, obtenerProyectos);

// Actualizar un proyecto por id
// api/proyectos/:id
router.put(
   '/:id',
   [
      //middlewares
      validarJWT,
      check('id', 'No es un id de Mongo valido').isMongoId(),
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   actualizarProyecto
);

// Eliminar un proyecto por su id
// api/proyectos/:id
router.delete(
   '/:id',
   [
      // middlewares
      validarJWT,
      check('id', 'No es un id de Mongo valido').isMongoId(),
      validarCampos,
   ],
   eliminarProyecto
);

module.exports = router;
