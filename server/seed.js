const mongoose = require('mongoose');
const Product = require('./models/Product'); 
require('dotenv').config();

const data = [
    { name: "Milk", price: 30, category: "Dairy", imageUrl: "URL_HERE" },
    { name: "Bread", price: 20, category: "Bakery", imageUrl: "URL_HERE" }
   
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
      await Product.insertMany(data);
      console.log("Added 25 products!");
      process.exit();
  });