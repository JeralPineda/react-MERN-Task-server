const express = require('express');
require('dotenv').config(); //variables de entorno
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor
const app = express();

// Conectar a la BD
dbConnection();

// puerto del servidor
const PORT = process.env.PORT || 4000;

// CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

//Importar rutas
app.use('/api/auth', require('./routes/usuarios'));

// arrancar la app
app.listen(PORT, () => {
   console.log(`El servidor esta corriendo en  http://localhost:${PORT}`);
});
