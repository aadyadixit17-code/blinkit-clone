const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust path to your model

// This handles the request to /api/products/
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;