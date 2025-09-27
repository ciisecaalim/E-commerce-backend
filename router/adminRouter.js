const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();

router.post("/create/admin", adminController.createAdmin);
router.post("/login/admin", adminController.adminLogin);
router.get("/read/admin", adminController.readAdmin);

module.exports = router;
