const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const productRouter = require("./router/productRouter"); // corrected name
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/orderRoutes");
const userRouter = require("./router/userRouter"); // corrected name
const adminRouter = require("./router/adminRouter");
const cors = require("cors");

const app = express();

app.use(cors());

const port = process.env.PORT || 5000; // corrected to PORT
app.use(express.json());

mongoose.connect(process.env.mongodb_url)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

app.use(productRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);
app.use("/allImg", express.static("document")); // Ensure the directory name is correct

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});