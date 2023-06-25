const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const cartSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  itemIds: [{
    type: Number,
    ref: 'Item'
  }]
},{collection: 'Carts_Collection'});


module.exports = mongoose.model('Cart', cartSchema);