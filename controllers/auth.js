const { response } = require('express');

const registerUser = (req, res = response) => {
   const user = req.body;
   res.json({
      user,
   });
};

module.exports = {
   registerUser,
};
