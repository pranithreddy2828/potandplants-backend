const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all orders (Admin only)
router.get('/', [authMiddleware, adminMiddleware], async (req, res) => {
  const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
  res.json(orders);
});

// Get current user's orders (by phone number)
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    const orders = await Order.find({ phoneNumber: user.phoneNumber })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create new order (Public for now or User auth?)
router.post('/', async (req, res) => {
  const { customerName, phoneNumber, email, address, items, totalAmount, paymentStatus, paymentMethod } = req.body;
  try {
    const newOrder = new Order({ customerName, phoneNumber, email, address, items, totalAmount, paymentStatus: paymentStatus || 'pending', paymentMethod: paymentMethod || 'Razorpay' });
    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update order status/payment info (Admin only)
router.put('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete individual order (Admin only)
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Order deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Clear all orders (Admin only)
router.delete('/', [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ msg: 'All orders cleared' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
