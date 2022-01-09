const { response } = require('express');

const registerUser = (req, res = response) => {
   res.json({
      msg: 'Hola desde usuarios',
   });
};

module.exports = {
   registerUser,
};
