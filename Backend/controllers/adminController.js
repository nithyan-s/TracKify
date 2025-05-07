const Admin = require("../models/admin");
const Seller = require("../models/seller");
const Warehouse = require("../models/warehouse");
const Buyer = require("../models/buyer");
const Product = require("../models/product");

exports.getAllUsers = async (req, res) => {
    try {
        const buyers = await Buyer.find();
        const sellers = await Seller.find();
        const warehouses = await Warehouse.find();
        res.json({ buyers, sellers, warehouses});
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" });
    }
};

const bcrypt = require("bcryptjs");

exports.addSeller = async (req, res) => {
    try {
        const { name, contact, email, password } = req.body;
        const adminId = req.params.id;

        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newSeller = new Seller({
            name,
            contact,
            email,
            password: hashedPassword,
            createdBy: adminId
        });

        await newSeller.save();
        res.status(201).json({ message: "Seller added", seller: newSeller });
    } catch (err) {
        res.status(500).json({ error: "Failed to add seller" });
    }
};

exports.addWarehouse = async (req, res) => {
    try {
        const { email, password, location, nextwarehouse, isLast } = req.body;
        const adminId = req.params.id;

        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ error: "Admin not found" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newWarehouse = new Warehouse({
            email,
            password: hashedPassword,
            location,
            nextwarehouse: nextwarehouse || null,
            isLast: isLast || false,
            createdBy: adminId
        });

        await newWarehouse.save();
        res.status(201).json({ message: "Warehouse created", warehouse: newWarehouse });
    } catch (err) {
        res.status(500).json({ error: "Failed to create warehouse" });
    }
};


exports.getNotifications = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: "Admin not found" });
        res.json({ notifications: admin.notifications || [] });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};
