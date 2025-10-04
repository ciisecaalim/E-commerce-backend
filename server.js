const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRouter = require("./router/productRouter");
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/orderRoutes");
const userRouter = require("./router/useRouter");
const adminRouter = require("./router/adminRouter");
const cors = require("cors");

const app = express();

// ✅ CORS
const allowedOrigins = [
  "https://e-commerce-frontend-g5et.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// ✅ JSON middleware
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});


// ✅ Routes
app.use("/api/products", productRouter);
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

// ✅ Static folder
app.use("/allImg", express.static("document"));

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
