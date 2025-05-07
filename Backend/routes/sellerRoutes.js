const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const {verifyToken,restrictTo}=require("../middleware/authMiddleware");

router.get("/products", verifyToken, restrictTo("seller"), sellerController.getMyProducts);
router.post("/:id/addprod", sellerController.addProduct);
router.get("/:id/products", sellerController.getProducts);
router.post("/:id/deleteNotify", sellerController.requestDeletion);

module.exports = router;
