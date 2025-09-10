const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  items: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;