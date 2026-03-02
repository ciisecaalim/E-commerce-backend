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

const basePort = Number(process.env.PORT) || 3000
const MAX_PORT_RETRIES = 10
const LOCAL_MONGODB_URL = process.env.LOCAL_MONGODB_URL || "mongodb://127.0.0.1:27017/ecommerce"

async function connectMongoDB() {
  const dbUrls = [process.env.MONGODB_URL, LOCAL_MONGODB_URL].filter(Boolean)
  let lastError = null

  for (const dbUrl of dbUrls) {
    try {
      await mongoose.connect(dbUrl)
      console.log(`MongoDB connected: ${dbUrl}`)
      return
    } catch (err) {
      lastError = err
      console.error(`MongoDB connection failed for ${dbUrl}:`, err.message)
    }
  }

  throw lastError
}

// Add root route handler
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce Backend API is running!",
    status: "success",
    endpoints: {
      products: "/api/products",
      customers: "/api/customers", 
      orders: "/api/orders",
      users: "/api/users",
      admin: "/api/admin",
      images: "/allImg"
    }
  })
})

// Add API prefixes to all routers
app.use("/api/products", productRouter)
app.use("/api/customers", customerRouter)
app.use("/api/orders", orderRouter)
app.use("/api/users", userRouter)
app.use("/api/admin", adminRouter)
app.use("/allImg", express.static("document"))

// Add 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    status: "error",
    availableRoutes: {
      root: "/",
      products: "/api/products",
      customers: "/api/customers",
      orders: "/api/orders", 
      users: "/api/users",
      admin: "/api/admin",
      images: "/allImg"
    }
  })
})

function startServer(port, retriesLeft = MAX_PORT_RETRIES) {
  const server = app.listen(port, () => console.log(`Server running on port ${port}`))

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && retriesLeft > 0) {
      const nextPort = port + 1
      console.warn(`Port ${port} is in use. Retrying on ${nextPort}...`)
      startServer(nextPort, retriesLeft - 1)
      return
    }

    console.error("Server startup error:", err)
    process.exit(1)
  })
}

connectMongoDB()
  .then(() => startServer(basePort))
  .catch((err) => {
    console.error("Unable to connect to MongoDB. Start local MongoDB or fix MONGODB_URL.")
    console.error(err)
    process.exit(1)
  })
