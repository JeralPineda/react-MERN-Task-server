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

module.exports = model('Proyecto', ProyectoSchema);
