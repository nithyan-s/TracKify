const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin'},
  walletAddress: { type: String },
  notifications: [
    {
      message: { type: String, required: true },
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "seller" }, // NEW
      timestamp: { type: Date, default: Date.now }
    }
  ]
});


module.exports = mongoose.model("admin", adminSchema);
