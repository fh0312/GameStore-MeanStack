const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const bibliotecaSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  itemIds: [{
    item: {
      type: Number,
      ref: 'Item'
    },
    acquisitionDate: {
      type: Date,
      default: Date.now
    }
  }]
},{collection: 'Bibliotecas_Collection'});


module.exports = mongoose.model('Biblioteca', bibliotecaSchema);