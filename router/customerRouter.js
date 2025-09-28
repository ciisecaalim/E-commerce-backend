const express = require("express")
const customerController = require("../controller/customerController")
const {verifyToken, isAdmin} = require("../middleware/auth")


const router = express.Router()

router.post("/create/customer", customerController.createCustomer)
router.post("/login/customer", customerController.cutomerLgin)
router.get("/read/customer", verifyToken, isAdmin, customerController.readCustomer)


module.exports = router