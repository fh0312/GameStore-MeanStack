const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  itemIds: [{
    type: Number,
    ref: 'Item'
  }]
},{collection: 'Wishlists_Collection'});


module.exports = mongoose.model('Wishlist', wishlistSchema);