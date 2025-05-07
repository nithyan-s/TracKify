const Seller = require("../models/seller");
const Product = require("../models/product");
const Admin = require("../models/admin");

exports.addProduct = async (req, res) => {
    try {
      const { name, warehouseHash, buyerHash, category, cost, qty } = req.body;
      const sellerId = req.params.id;
  
      const seller = await Seller.findById(sellerId);
      if (!seller) return res.status(404).json({ error: "Seller not found" });
  
      const newProduct = new Product({ 
        name, 
        warehouseHash, 
        buyerHash, 
        category, 
        cost, 
        qty, 
        sellerId 
      });
  
      await newProduct.save();
  
      seller.products.push(newProduct._id);
      await seller.save();
  
      res.status(201).json({ message: "Product added", product: newProduct });
    } catch (err) {
      res.status(500).json({ error: "Failed to add product" });
    }
  };

exports.getMyProducts = async (req, res) => {
    try {
      // The seller ID should be available from the JWT verification middleware
      const sellerId = req.user.id;
      
      const seller = await Seller.findById(sellerId).populate("products");
      console.log(seller)
      if (!seller) return res.status(404).json({ error: "Seller not found" });
      console.log(seller.products)
      res.json({ sellerName: seller.name, products: seller.products });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };

exports.getProducts = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id).populate("products");
        if (!seller) return res.status(404).json({ error: "Seller not found" });
        res.json({ sellerName: seller.name, products: seller.products });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};


exports.requestDeletion = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ error: "Seller not found" });

        const adminId = seller.createdBy;
        if (!adminId) return res.status(400).json({ error: "No linked admin" });

        await Admin.findByIdAndUpdate(adminId, {
            $push: {
                notifications: {
                    message: `Seller "${seller.name}" has requested deletion.`,
                    sellerId: seller._id
                }
            }
        });

        res.status(200).json({ message: "Deletion request sent" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send deletion request" });
    }
};
