const { response } = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const iniciarSesion = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      let usuario = await Usuario.findOne({ email });

      // Validando si el correo ya existe
      if (!usuario) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe',
         });
      }

      //   Revisar el password
      const passwordCorrecto = await bcrypt.compare(password, usuario.password);

      if (!passwordCorrecto) {
         return res.status(400).json({
            ok: false,
            msg: 'El password es incorrecto',
         });
      }

      //   Generar el JWT
      const token = await generarJWT(usuario.id, usuario.nombre);

      res.status(201).json({
         ok: true,
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

         /// Generar el JWT
         const token = await generarJWT(usuario.id, usuario.nombre);

         return res.json({
            ok: true,
            //  usuario,
            token,
         });
      }

      if (usuario && usuario.google === false) {
         // Tengo que actualizarlo

         await Usuario.findByIdAndUpdate(usuario.id, { google: true });
         //  await usuario.save();
      }

      // Si el usuario en DB
      if (!usuario.estado) {
         return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado',
         });
      }

      /// Generar el JWT
      const token = await generarJWT(usuario.id, usuario.nombre);

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

const iniciarSesionGithub = async (req, res = response) => {
   const { code } = req.query;

   try {
      const clientID = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      const tokenResponse = await axios({
         method: 'post',
         url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
         headers: {
            accept: 'application/json',
         },
      });

      const accessToken = tokenResponse.data.access_token;

      const result = await axios({
         method: 'get',
         url: `https://api.github.com/user`,
         headers: {
            accept: 'application/json',
            Authorization: `token ${accessToken}`,
         },
      });

      const { email, name: nombre } = result.data;

      let usuario = await Usuario.findOne({ email });

      if (!usuario) {
         // Tengo que crearlo
         const data = {
            nombre,
            email,
            password: ':P',
            github: true,
         };

         usuario = new Usuario(data);
         await usuario.save();

         /// Generar el JWT
         const token = await generarJWT(usuario.id, usuario.nombre);

         return res.redirect(`/?token=${token}`);
      }

      if (usuario && usuario.github === false) {
         // Tengo que actualizarlo

         await Usuario.findByIdAndUpdate(usuario.id, { github: true });
      }

      // Si el usuario en DB
      if (!usuario.estado) {
         return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado',
         });
      }

      /// Generar el JWT
      const token = await generarJWT(usuario.id, usuario.nombre);

      res.redirect(`${process.env.GITHUB_HOME_URL}/?token=${token}`);
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Token de GitHub no valido',
      });
   }
};

//Obtiene que usuario esta autenticado
const usuarioAutenticado = async (req, res = response) => {
   const { id, name } = req;

   try {
      //    Generar un nuevo JWT y retornarlo en esta nueva petición
      const token = await generarJWT(id, name);

      res.json({
         ok: true,
         id,
         name,
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
   iniciarSesion,
   iniciarSesionGoogle,
   iniciarSesionGithub,
   usuarioAutenticado,
};
