const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: String // This will store the link to the image

});

module.exports = mongoose.model('Product', productSchema);