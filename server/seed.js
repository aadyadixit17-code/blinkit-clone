const mongoose = require('mongoose');
const Product = require('./models/Product'); 
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
      await Product.insertMany(data);
      console.log("Added 25 products!");
      process.exit();
  });