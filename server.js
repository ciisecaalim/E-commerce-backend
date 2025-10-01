const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const producRouter = require("./router/productRouter")
const customerRouter = require("./router/customerRouter")
const orderRouter = require("./router/orderRoutes")
const userRouter = require("./router/useRouter")
const adminRouter = require("./router/adminRouter")
const cors = require('cors');

const app = express()

app.use(cors())

const port = process.env.PORT || 5000
app.use(express.json())
 

mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("connected..")
})


app.use(producRouter)
app.use(customerRouter)
app.use(orderRouter)
app.use(userRouter)
app.use(adminRouter)
app.use("/allImg", express.static("document")); // Ensure the directory name is correct

app.listen(port, () => { console.log(`server is running on port ${port}`)})