const { response } = require('express');
const axios = require('axios');
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
      console.log(`access token: ${accessToken}`);

      const result = await axios({
         method: 'get',
         url: `https://api.github.com/user`,
         headers: {
            accept: 'application/json',
            Authorization: `token ${accessToken}`,
         },
      });
      //   console.log(result.data);
      //   const name = result.data.email;
      //   res.redirect(`/home.html?name=${name}`);

      const { email, name: nombre } = result.data;
      console.log({ nombre, email });

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
      }

      if (usuario && usuario.github === false) {
         // Tengo que actualizarlo

         await Usuario.findByIdAndUpdate(usuario.id, { github: true });
         //  await usuario.save();
      }

      // Si el usuario en DB
      if (!usuario.estado) {
         return res.status(401).json({
            msg: 'Hable con el administrador, usuario bloqueado',
         });
      }

      /// Generar el JWT
      const token = await generarJWT(usuario.id);

      //   res.json({
      //      ok: true,
      //      //  usuario,
      //      token,
      //   });

      res.redirect(`/home.html?name=${token}`);
   } catch (error) {
      console.log(error);

      res.status(500).json({
         ok: false,
         msg: 'Token de GitHub no valido',
      });

      res.render();
   }
};

module.exports = {
   iniciarSesion,
   iniciarSesionGoogle,
   iniciarSesionGithub,
};
