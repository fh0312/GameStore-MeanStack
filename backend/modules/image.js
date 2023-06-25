const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const imageSchema = new Schema({
    data: Buffer,
    contentType: String
},{collection: 'Images_Collection'});


module.exports = mongoose.model('Image', imageSchema);
