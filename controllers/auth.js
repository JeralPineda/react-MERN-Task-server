const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const IniciarSesion = async (req, res = response) => {
   res.json({
      msg: 'Iniciar sesión...',
   });
};

module.exports = {
   IniciarSesion,
};
