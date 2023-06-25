const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    data: Buffer,
    contentType: String
  }
},{collection: 'Users_Collection'});


module.exports = mongoose.model('User', userSchema);
