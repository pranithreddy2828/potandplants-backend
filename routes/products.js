const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const upload = require('../middleware/upload');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add product (Admin only)
router.post('/', [authMiddleware, adminMiddleware, upload.single('image')], async (req, res) => {
  const { name, price, description, care_instructions, category_id, is_featured, is_best_seller, stock } = req.body;
  const image_filename = req.file ? req.file.path : req.body.image_filename; // use path from upload or filename from manual input
  
  try {
    const newProduct = new Product({
      name, 
      price, 
      description, 
      care_instructions, 
      image_filename, 
      category_id, 
      is_featured, 
      is_best_seller, 
      stock 
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete product (Admin only)
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
