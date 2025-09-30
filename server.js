const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./router/productRouter");
const customerRouter = require("./router/customerRouter");
const orderRouter = require("./router/orderRouter");
const userRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");

const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-frontend-six-rho.vercel.app"
];

// ✅ CORS Config
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Preflight handler
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ JSON parser
app.use(express.json());

const port = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected.."))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mount routers with path prefixes
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);

// ✅ Static folder for images
app.use("/allImg", express.static("document"));

// Debug: print all registered routes
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("Route:", r.route.path);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
