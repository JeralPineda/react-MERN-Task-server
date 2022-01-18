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

module.exports = {
   postProyecto,
   obtenerProyectos,
};
