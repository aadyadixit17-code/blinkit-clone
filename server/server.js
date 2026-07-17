const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();
app.use(cors());       
app.use(express.json()); 



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Connection failed:", err));
  // In server.js
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);