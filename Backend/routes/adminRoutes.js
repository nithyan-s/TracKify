const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getusers", adminController.getAllUsers);
router.post("/:id/addseller", adminController.addSeller);
router.post("/:id/addwarehouse", adminController.addWarehouse);
router.get("/:id/notifications", adminController.getNotifications);

module.exports = router;
