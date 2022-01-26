const { response } = require('express');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

// Crear una nueva tarea
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

// Obtener tareas por proyecto
const obtenerTareas = async (req, res = response) => {
   const { proyecto } = req.params;

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

      // Obtener las tareas por proyecto
      const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });

      res.json({
         ok: true,
         tareas,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador',
      });
   }
};

// Actualizar una tarea por id
const actualizarTarea = async (req, res = response) => {
   const { id } = req.params;
   const { proyecto, nombre, estado } = req.body;

   try {
      //Revisar si la tarea existe
      let tarea = await Tarea.findById(id);

      if (!tarea) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe esa tarea',
         });
      }

      const proyectoExiste = await Proyecto.findById(proyecto);

      //Validar que el proyecto exista
      if (!proyectoExiste) {
         return res.status(404).json({
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

      // Crear un objeto con los datos nuevos de la tarea
      const nuevaTarea = {};

      nuevaTarea.nombre = nombre;
      nuevaTarea.estado = estado;

      // Guardamos la tarea
      tarea = await Tarea.findByIdAndUpdate(id, { $set: nuevaTarea }, { new: true });

      res.json({
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

// Eliminar una tarea por id
const eliminarTarea = async (req, res = response) => {
   const { id } = req.params;
   const { proyecto } = req.body;

   try {
      //Revisar si la tarea existe
      let tarea = await Tarea.findById(id);

      if (!tarea) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe esa tarea',
         });
      }

      //Validar que el proyecto exista
      const proyectoExiste = await Proyecto.findById(proyecto);

      if (!proyectoExiste) {
         return res.status(404).json({
            ok: false,
            msg: 'Proyecto no encontrado',
         });
      }

      if (tarea.proyecto.toString() !== proyecto) {
         return res.status(401).json({
            ok: false,
            msg: 'No autorizado',
         });
      }

      // Verificar que el proyecto actual pertenece al usuario autenticado
      if (proyectoExiste.creador.toString() !== req.id) {
         return res.status(401).json({
            ok: false,
            msg: 'No autorizado',
         });
      }

      // Eliminar el tarea
      await Tarea.findByIdAndDelete(id);

      res.json({
         ok: true,
         msg: 'Tarea eliminada',
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
   obtenerTareas,
   actualizarTarea,
   eliminarTarea,
};
