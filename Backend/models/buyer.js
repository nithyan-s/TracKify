const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isReceived: { type: Boolean, default: false },
  walletAddress: { type: String },
  productReceived: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  },
  isverified: { type: Boolean, default: false }, // True if hashes match
  role: { type: String, default: 'buyer'},
  orders: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
      orderDate: { type: Date, default: Date.now },
      status: { type: String, default: "PLACED" },
      firstWarehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "warehouse"
      }
    }
  ],

  notifications: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("buyer", buyerSchema);
