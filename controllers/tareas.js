const { response } = require('express');
const Tarea = require('../models/Tarea');

const crearTarea = async (req, res = response) => {
   const { nombre } = req.body;

   res.json({
      nombre,
   });
};

module.exports = {
   crearTarea,
};
