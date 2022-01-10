const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
   // obtener el token desde el header
   const xtoken = req.header('x-token');
   let token;

   // Pasar el Bearer a mayúsculas por si se recibe en minúsculas
   if (xtoken && xtoken.toLowerCase().startsWith('bearer')) {
      // extraemos la palabra Bearer del token
      token = xtoken.split(' ')[1];
   }

   //    verificar que exista el token
   if (!token || !xtoken) {
      return res.status(401).json({
         msg: 'No hay token en la petición',
      });
   }

   try {
      const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

      req.uid = uid;
      req.name = name;
   } catch (error) {
      console.log(error);
      res.status(401).json({
         msg: 'Token no valido',
      });
   }

   next();
};

module.exports = {
   validarJWT,
};
