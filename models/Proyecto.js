const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
   nombre: {
      type: String,
      require: true,
      trim: true,
   },
   creador: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
   },
   creado: {
      type: Date,
      default: Date.now(),
   },
});

// Limitamos la información de la petición a mostrar
ProyectoSchema.methods.toJSON = function () {
   const { __v, _id, ...proyecto } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   proyecto.id = _id;

   return proyecto;
};

module.exports = model('Proyecto', ProyectoSchema);
