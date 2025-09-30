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

// ✅ CORS config
const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://e-commerce-frontend-six-rho.vercel.app" // production frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Port (Render will inject PORT)
const port = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected.."))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Routes
app.use(producRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);

// ✅ Static files
app.use("/allImg", express.static("document")); 

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
