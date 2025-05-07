const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const {verifyToken,restrictTo}  = require("../middleware/authMiddleware");

router.get("/me",verifyToken, restrictTo("buyer"),  buyerController.getmyid);
router.get("/products", buyerController.getAllProducts);
router.post("/:buyerId/product/:productId/buy", buyerController.buyProduct);

module.exports = router;
