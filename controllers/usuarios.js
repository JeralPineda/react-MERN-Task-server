const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const crearUsuario = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      let usuario = await Usuario.findOne({ email });

      // Validando si el correo ya existe
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe',
         });
      }

      // crea el nuevo usuario
      usuario = new Usuario(req.body);

      //   Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      // Guardar el nuevo usuario
      await usuario.save();

      //   Generar el JWT
      const token = await generarJWT(usuario.id, usuario.nombre);

      res.status(201).json({
         ok: true,
         msg: 'Usuario creado correctamente',
         token,
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
