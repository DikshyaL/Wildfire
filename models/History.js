const mongoose = require('mongoose');
// Define the schema for the history model
const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['donation', 'receipt'], required: true }, // Either a donation or a receipt
  item: { type: String, required: true }, // What was donated/received
  quantity: { type: Number, required: true }, // How much
  relatedUser: { type: String, required: true }, // Donor or receiver's name
  date: { type: Date, default: Date.now }, // When the action occurred
});
// Create and export the model
const History = mongoose.model('History', historySchema);
module.exports = History;