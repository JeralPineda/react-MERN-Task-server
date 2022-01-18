const { response } = require('express');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

const crearTarea = async (req, res = response) => {
   const { proyecto } = req.body;

   try {
      const proyectoExiste = await Proyecto.findById(proyecto);

      //Validar que el proyecto exista
      if (!proyectoExiste) {
         return res.status(400).json({
            ok: false,
            msg: 'Proyecto no encontrado',
         });
      }

      // Verificar que el proyecto actual pertenece al usuario autenticado
      if (proyectoExiste.creador.toString() !== req.id) {
         return res.status(401).json({
            ok: false,
            msg: 'No autorizado',
         });
      }

      // Creamos la tarea
      const tarea = new Tarea(req.body);

      // Guardamos la nueva tarea en DB
      await tarea.save();

      res.status(201).json({
         ok: true,
         tarea,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   crearTarea,
};
