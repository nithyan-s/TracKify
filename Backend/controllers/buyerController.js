const Buyer = require("../models/buyer");
const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("sellerId", "name email");
        res.status(200).json({ message: "All available products", products });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.getmyid = async (req, res) => {
    try {
      // The seller ID should be available from the JWT verification middleware
      const buyerId = req.user.id;
      
      if (!buyerId) return res.status(404).json({ error: "buyer not found" });
      res.json({ buyerId});
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  }

exports.buyProduct = async (req, res) => {
    try {
        const { buyerId, productId } = req.params;
        const { quantity = 1 } = req.body;

        const buyerData = await Buyer.findById(buyerId);
        const productData = await Product.findById(productId);

        if (!buyerData || !productData) return res.status(404).json({ error: "Buyer or Product not found" });

        const order = {
            product: productId,
            quantity,
            status: "PLACED",
            orderDate: new Date(),
            firstWarehouse: productData.firstWarehouse
        };

        buyerData.orders.push(order);
        buyerData.notifications.push({
            message: `Order placed for product "${productData.name}"`,
            timestamp: new Date()
        });

        await buyerData.save();

        res.status(201).json({ message: "Order placed", order });
    } catch (err) {
        res.status(500).json({ error: "Failed to place order" });
    }
};
