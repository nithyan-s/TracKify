
const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  walletAddress: { type: String },
  role: { type: String,   default: 'warehouse'},
  productsScanned: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      timestamp: { type: Date, default: Date.now },
      isValid: { type: Boolean}
    }
  ],

  nextwarehouse: { type: mongoose.Schema.Types.ObjectId, ref: "warehouse" },
  isLast: { type: Boolean, default: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" } // admin who created this warehouse
});

module.exports = mongoose.model("warehouse", warehouseSchema);
