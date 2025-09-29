const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const producRouter = require("./router/productRouter");
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/orderRoutes");
const userRouter = require("./router/useRouter");
const adminRouter = require("./router/adminRouter");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Routers
app.use(producRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);

// Static files
app.use("/allImg", express.static("document"));

// Port (Render uses process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
