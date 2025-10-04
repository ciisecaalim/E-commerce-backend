require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const productRouter = require("./router/productRouter")
const customerRouter = require("./router/customerRouter")
const orderRouter = require("./router/orderRoutes")
const userRouter = require("./router/useRouter")
const adminRouter = require("./router/adminRouter")

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected.."))
  .catch(err => console.error("MongoDB connection error:", err))

app.use(productRouter)
app.use(customerRouter)
app.use(orderRouter)
app.use(userRouter)
app.use(adminRouter)
app.use("/allImg", express.static("document"))

app.listen(port, () => console.log(`Server running on port ${port}`))
