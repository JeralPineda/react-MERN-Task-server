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

      if (!usuario) {
         // Tengo que crearlo
         const data = {
            nombre,
            email,
            password: ':P',
            google: true,
         };

         usuario = new Usuario(data);
         await usuario.save();
      }

      // Si el usuario en DB
      if (!usuario.estado) {
         return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado',
         });
      }

      /// Generar el JWT
      const token = await generarJWT(usuario.id);

      res.json({
         ok: true,
         //  usuario,
         token,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Token de Google no valido',
      });
   }
};

module.exports = {
   iniciarSesion,
   iniciarSesionGoogle,
};
