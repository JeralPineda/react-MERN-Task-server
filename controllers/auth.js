const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const iniciarSesion = async (req, res = response) => {
   res.json({
      msg: 'Iniciar sesión...',
   });
};

const iniciarSesionGoogle = async (req, res = response) => {
   const { id_token } = req.body;

   try {
      const { nombre, email } = await googleVerify(id_token);

      let usuario = await Usuario.findOne({ email });

      // Validando si el correo ya existe
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe',
         });
      }

      res.json({
         ok: true,
         msg: 'Usuario creado correctamente',
         nombre,
         email,
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
   iniciarSesion,
   iniciarSesionGoogle,
};
