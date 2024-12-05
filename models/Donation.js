const express = require('express');
const History = require('./models/History');
const User = require('./models/User');
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
// Donation Route
app.post('/donate', async (req, res) => {
  const { donorEmail, item, quantity, receiver } = req.body;
  try {
    // Find the donor in the database
    const donor = await User.findOne({ email: donorEmail });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    // Create a new history record for the donation
    const donation = new History({
      userId: donor._id,
      type: 'donation',
      item,
      quantity,
      relatedUser: receiver,
    });
    await donation.save(); // Save the donation record
    res.status(200).json({ message: 'Donation logged successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging donation', details: err });
  }
});