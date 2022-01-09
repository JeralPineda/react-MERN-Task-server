const { response } = require('express');

const loginUsuario = (req, res = response) => {
   res.json({
      msg: 'Hola desde usuarios',
   });
};

module.exports = {
   loginUsuario,
};
