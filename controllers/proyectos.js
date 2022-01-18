const { response } = require('express');
const Proyecto = require('../models/Proyecto');

const postProyecto = async (req, res = response) => {
   //extremos el id del usuario autenticado
   const creador = req.id;

   const { nombre } = req.body;

   const data = {
      nombre,
      creador,
   };

   try {
      // Crear un nuevo proyecto
      const proyecto = new Proyecto(data);

      //Guardamos el proyecto en la BD
      proyecto.save();

      res.status(201).json({
         ok: true,
         proyecto,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

// Obtiene todos los proyectos del usuario actual
const obtenerProyectos = async (req, res = response) => {
   try {
      const proyectos = await Proyecto.find({ creador: req.id }).sort({ creado: -1 });

      if (!proyectos) {
         return res.status(400).json({
            ok: false,
            msg: 'No hay proyectos',
         });
      }

      res.json({
         proyectos,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

// Actualizar un proyecto
const actualizarProyecto = async (req, res = response) => {
   const { id } = req.params;
   const { nombre } = req.body;

   const nuevoProyecto = {};

   try {
      nuevoProyecto.nombre = nombre;

      // Revisar el ID
      let proyecto = await Proyecto.findById(id);

      // Verificar que le proyecto exista
      if (!proyecto) {
         return res.status(404).json({
            ok: false,
            msg: 'Proyecto no encontrado',
         });
      }

      // Verificar el creador del proyecto
      if (proyecto.creador.toString() !== req.id) {
         return res.status(401).json({
            ok: false,
            msg: 'No autorizado',
         });
      }

      // Actualizar
      proyecto = await Proyecto.findByIdAndUpdate(id, { $set: nuevoProyecto }, { new: true });

      res.json({
         ok: true,
         proyecto,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

// Eliminar un proyecto
const eliminarProyecto = async (req, res = response) => {
   const { id } = req.params;

   try {
      // Revisar el ID
      let proyecto = await Proyecto.findById(id);

      // Verificar que le proyecto exista
      if (!proyecto) {
         return res.status(404).json({
            ok: false,
            msg: 'Proyecto no encontrado',
         });
      }

      // Verificar el creador del proyecto
      if (proyecto.creador.toString() !== req.id) {
         return res.status(401).json({
            ok: false,
            msg: 'No autorizado',
         });
      }

      // Eliminar el proyecto
      proyecto = await Proyecto.findOneAndDelete(id);

      res.json({
         ok: true,
         msg: 'Proyecto eliminado',
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
   postProyecto,
   obtenerProyectos,
   actualizarProyecto,
   eliminarProyecto,
};
