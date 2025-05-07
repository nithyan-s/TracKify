const Admin = require("../models/admin");
const Buyer = require("../models/buyer");
const Seller = require("../models/seller");
const Warehouse = require("../models/warehouse");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const models = {
  admin: Admin,
  buyer: Buyer,
  seller: Seller,
  warehouse: Warehouse,
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password, role, walletAddress } = req.body;

  const Model = models[role];
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  const user = await Model.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  // Update walletAddress on login if provided
  if (walletAddress && user.walletAddress !== walletAddress) {
    user.walletAddress = walletAddress;
    await user.save();
  }

  const token = generateToken(user._id, role);
  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .status(201)
    .json({ message: "Logged in successful", token, userId: user._id, role }); // ✔ combined response
};

// REGISTER
exports.register = async (req, res) => {
  const { email, password, role, name, contact, location, walletAddress } = req.body;

  const Model = models[role];
  if (!Model) return res.status(400).json({ message: "Invalid role" });

  const existing = await Model.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 12);

  const userData = {
    email,
    password: hashedPassword,
    role,
    ...(name && { name }),
    ...(contact && { contact }),
    ...(location && { location }),
    ...(walletAddress && { walletAddress }) // ✅ include walletAddress in registration
  };

  const user = await Model.create(userData);
  const token = generateToken(user._id, role);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .status(201)
    .json({ message: "Registration successful", userId: user._id, role });
};



// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ message: "Logged out successfully" });
};
