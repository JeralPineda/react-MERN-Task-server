const { Schema, model } = require('mongoose');

const TareaSchema = Schema({
   nombre: {
      type: String,
      require: true,
      trim: true,
   },
   estado: {
      type: Boolean,
      default: false,
   },
   creado: {
      type: Date,
      default: Date.now(),
   },
   proyecto: {
      type: Schema.Types.ObjectId,
      ref: 'Proyecto',
   },
});

// Limitamos la información de la petición a mostrar
TareaSchema.methods.toJSON = function () {
   const { __v, _id, ...tarea } = this.toObject();

   //    Remplazamos el nombre de _id por uid
   tarea.id = _id;

   return tarea;
};

module.exports = model('Tarea', TareaSchema);
