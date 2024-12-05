const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const History = require('./models/History');

const app = express();
const port = process.env.PORT || 8080;

const uri = "mongodb+srv://smandira984:1234@wildfire2.6fkmw.mongodb.net/?retryWrites=true&w=majority&appName=wildfire2";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

// Sample route to check MongoDB connection
app.get('/', (req, res) => {
  res.send('Hello, MongoDB is connected!');
});

// Register route to create a new user
app.post('/register', async (req, res) => {
  const { name, email, password, role, city } = req.body;  // Get city from request body

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password,
      role,
      city,  // Save the city name instead of latitude and longitude
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err });
  }
});

// Donation route
app.post('/donate', async (req, res) => {
  const { donorEmail, item, quantity, receiver } = req.body;
  try {
    const donor = await User.findOne({ email: donorEmail });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    // Create new history entry for the donation
    const donation = new History({
      userId: donor._id,
      type: 'donation',
      item,
      quantity,
      relatedUser: receiver
    });

    await donation.save();
    res.status(200).json({ message: 'Donation logged successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error logging donation', details: err });
  }
});

// Receive route
app.post('/receive', async (req, res) => {
  const { receiverEmail, item, quantity, donor } = req.body;
  try {
    const receiver = await User.findOne({ email: receiverEmail });
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

    // Create new history entry for the receipt
    const receipt = new History({
      userId: receiver._id,
      type: 'receipt',
      item,
      quantity,
      relatedUser: donor
    });

    await receipt.save();
    res.status(200).json({ message: 'Receipt logged successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error logging receipt', details: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
