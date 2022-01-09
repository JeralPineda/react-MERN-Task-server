const express = require('express');

//crear el servidor
const app = express();

// puerto del servidor
const PORT = process.env.PORT || 4000;

//Definir la pagina principal
app.get('/', (req, res) => {
   res.send('Hola mundo');
});

// arrancar la app
app.listen(PORT, () => {
   console.log(`El servidor esta corriendo en  http://localhost:${PORT}`);
});
