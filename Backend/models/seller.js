const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'seller'},
  walletAddress: { type: String },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }
});

module.exports = mongoose.model("seller", sellerSchema);


