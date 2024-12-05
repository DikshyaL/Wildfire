const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let donations = [
  // Sample donations data
  { id: 1, item: 'Food', quantity: 5, donationType: 'food', donorId: 'donor1', status: 'available' },
  { id: 2, item: 'Clothes', quantity: 10, donationType: 'clothes', donorId: 'donor2', status: 'available' },
];

let users = {
  'donor1': { donated: [1], received: [] }, // User donated item 1
  'receiver1': { donated: [], received: [] },
};

// Endpoint to fetch donations
app.get('/getDonations', (req, res) => {
  const availableDonations = donations.filter(donation => donation.status === 'available');
  res.json({ donations: availableDonations });
});

// Endpoint to accept donation
app.post('/acceptDonation', (req, res) => {
  const { donationId, userId, donorId } = req.body;

  const donation = donations.find(d => d.id === donationId);

  if (!donation || donation.status !== 'available') {
    return res.status(400).json({ message: 'Donation is no longer available' });
  }

  // Remove from donor's donated list and add to receiver's received list
  users[donorId].donated = users[donorId].donated.filter(id => id !== donationId);
  users[userId].received.push(donationId);

  // Update donation status
  donation.status = 'accepted';

  // Respond with success
  res.json({ message: 'Donation accepted successfully!' });
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
