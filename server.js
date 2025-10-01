const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const productRouter = require("./router/productRouter");
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/orderRouter"); // sax magac
const userRouter = require("./router/useRouter");   // sax magac
const adminRouter = require("./router/adminRouter");
const cors = require("cors");

const app = express();

// ✅ CORS config
const allowedOrigins = [
  "https://e-commerce-frontend-g5et.onrender.com", // frontend live
  "http://localhost:3000" // local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Routes
app.use(productRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);

// ✅ Static folder
app.use("/allImg", express.static("document"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
