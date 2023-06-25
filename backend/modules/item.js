const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const itemSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String
      },
    type:{
        type: String,
    },
    description:{
        type: String,
    },
    platform:{
        type: String,
    },
    idiomas:{
        type: String,
    },
    price:{
        type: String,
        required: true,
    },
    classification:{
        type: String,
    },
    aval:{
        type: String,
    },
    link:{
        type: String,
    },
    image1: {
        data: Buffer,
        contentType: String
     },
     image2: {
         data: Buffer,
         contentType: String
      },
},{collection: 'Items_Collection'});


module.exports = mongoose.model('item', itemSchema);
