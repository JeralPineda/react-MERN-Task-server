const { response } = require('express');
const Proyecto = require('../models/Proyecto');

const postProyecto = async (req, res = response) => {
   const creador = req.id;
   const { nombre } = req.body;

   const data = {
      nombre,
      creador,
   };

   try {
      // Crear un nuevo proyecto
      const proyecto = new Proyecto(data);
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

module.exports = {
   postProyecto,
};
