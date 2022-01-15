const { response } = require('express');
// const Proyecto = require('../models/Proyecto');

const postProyecto = async (req, res = response) => {
   const { nombre } = req.body;

   try {
      res.json({
         msg: 'nuevo proyecto',
         nombre,
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
