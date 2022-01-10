const { response } = require('express');

const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      let usuario = await Usuario.findOne({ email });

      // Validando si el correo ya existe
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con este correo',
         });
      }

      // crea el nuevo usuario
      usuario = new Usuario(req.body);

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
