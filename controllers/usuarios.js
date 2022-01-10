const { response } = require('express');

const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
   const { nombre, email, password } = req.body;

   try {
      let usuario;

      // crea el nuevo usuario
      usuario = new Usuario({ nombre, email, password });

      // Guardar el nuevo usuario
      await usuario.save();

      res.status(201).json({
         ok: true,
         uid: usuario.id,
         nombre: usuario.nombre,
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
   crearUsuario,
};
