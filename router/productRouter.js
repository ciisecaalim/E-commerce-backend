const express = require("express");
const productController = require("../controller/productController");
const uploadImg = require("../middleware/uploadImg");

const Router = express.Router();

Router.post("/create/product", uploadImg.single("img"), productController.createProduct);
Router.put("/update/product/:id", uploadImg.single("img"), productController.updateProduct);
Router.post("/read/product", productController.readProduct);
Router.get("/read/singleproduct/:id", productController.readSingleData);
Router.delete("/delete/product/:id", productController.deletedata);
Router.get("/readAllDoc", productController.readAllDocu);

module.exports = Router;