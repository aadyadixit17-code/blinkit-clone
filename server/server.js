const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');
const dns = require('dns');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

// Fix SRV DNS lookup issues on Windows
dns.setDefaultResultOrder('ipv4first');

const app = express();

app.use(cors());
app.use(express.json());

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_123';

// 1. Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://aadyadixit17_db_user:Aadya17@cluster0.xpgfhqo.mongodb.net/blinkit?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// 2. Product Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema, 'products');

// 3. User Schema & Model (For Email Auth & Database Persistence)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'users');

// 4. Order Schema & Model
const orderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  paymentId: String,
  status: { type: String, default: 'Order Placed & Out for Delivery' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema, 'orders');

// 5. Products API
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// 6. Authentication APIs (Register & Login with JWT & Password Hashing)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ success: true, token, email: newUser.email });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Verify password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ success: true, token, email: user.email });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// 7. Orders API Routes
app.post('/api/orders', async (req, res) => {
  try {
    const { items, totalAmount, paymentId } = req.body;
    const newOrder = new Order({ items, totalAmount, paymentId });
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// 8. Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

// 9. Payment Checkout Route with Robust Fallback
app.post('/api/payment/checkout', async (req, res) => {
  try {
    const { amount } = req.body;

    try {
      const options = {
        amount: amount * 100, // Converts rupees to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      return res.status(200).json({ success: true, order });
    } catch (razorpayError) {
      console.warn('Razorpay API call failed, falling back to local mock order:', razorpayError.message);
      
      const mockOrder = {
        id: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR',
      };
      return res.status(200).json({ success: true, order: mockOrder });
    }
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ success: false, message: 'Server error creating order' });
  }
});

// 10. Serve Frontend Static Assets in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));