const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'seller'},
    warehouseHash: { type: String}, // WH (sent to warehouses)
    buyerHash: { type: String},     // BH (sent to buyer)
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['IN_GODOWN', 'IN_TRANSIT', 'DELIVERED', 'FLAGGED'], default: 'IN_GODOWN' },
    firstWarehouse: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'warehouse', 
    },
    category:{type : String},
    qty:{type: Number},
    cost:{type : Number} 

  });
  module.exports = mongoose.model("product",productSchema);