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

 
 

app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected.."))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(producRouter);
app.use(customerRouter);
app.use(orderRouter);
app.use(userRouter);
app.use(adminRouter);

app.use("/allImg", express.static("document")); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
