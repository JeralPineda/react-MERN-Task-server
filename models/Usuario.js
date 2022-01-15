const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
   nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      trim: true,
      unique: true,
   },
   password: {
      type: String,
      required: [this.google === false || this.github === false, 'La contraseña es requerida.'],
      trim: true,
   },
   registro: {
      type: Date,
      default: Date.now(),
   },
   estado: {
      type: Boolean,
      default: true,
   },
   google: {
      type: Boolean,
      default: false,
   },
   github: {
      type: Boolean,
      default: false,
   },
});

// Limitamos la información de la petición a mostrar
UsuarioSchema.methods.toJSON = function () {
   const { __v, password, _id, ...usuario } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   usuario.id = _id;

   return usuario;
};

module.exports = model('Usuario', UsuarioSchema);
