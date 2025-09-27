const express = require("express")
const userController = require("../controller/useControll")

const router = express.Router()

router.post("/create/user" , userController.createUser)
router.post("/login/user" , userController.userLogin)


module.exports = router