const orderModel = require("../model/ordermodel");
const productModel = require("../model/productModel");

// Create new order
const createOrder = async (req, res) => {
    const { customer, products } = req.body;

    // Ensure products is an array
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Products are required and should be an array." });
    }

    let totalAmount = 0;
    let orderProducts = [];

    // Check each product
    for (let item of products) {
        const product = await productModel.findById(item.productId);
        if (!product) {
            return res.status(400).json({ message: "Product not found." });
        }

        // Check stock
        if (item.quantity > product.quantity) {
            return res.status(400).json({ message: "Not enough stock for product: " + product.name });
        }

        // Calculate total
        const price = product.price;
        const total = price * item.quantity;
        totalAmount += total;

        // Update product quantity
        product.quantity -= item.quantity;
        await product.save();

        // Push to order products
        orderProducts.push({
            productId: product._id,
            quantity: item.quantity,
            price,
            total
        });
    }

    // Save order
    const order = new orderModel({
        customer,
        products: orderProducts,
        totalAmount
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
};


//read orders

const readOrder = async (req, res) => {
    const getOrderData = await orderModel.find().populate("products.productId", "name price");
    if(getOrderData){
        res.send(getOrderData)
    }
}


// total income

const getTotalIncome = async(req, res) => {
    const totalAmout = await orderModel.aggregate([
        {
            $group : {_id : null, totalIncome : {$sum: "$totalAmount"}}
        }
    ])

    if(totalAmout){
        res.send(totalAmout)
    }
}



//top customer
const getTopCustomer = async (req, res) => {
  try {
    const topCustomer = await orderModel.aggregate([
      {
        $group: {
          _id: "$customer", // <-- must be a field, not a string
          totalSpent: { $sum: "$totalAmount" }, // <-- make sure field name matches schema
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 }, // <-- $limit, not limit
    ]);

    if (topCustomer.length === 0) {
      return res.status(400).json({ message: "no customer found" });
    }

    res.json(
      topCustomer.map((item) => ({
        customer: item._id,
        totalSpent: item.totalSpent,
        orderCount: item.orderCount,
      }))
    );
  } catch (err) {
    console.error("Error in getTopCustomer:", err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { createOrder, readOrder, getTotalIncome, getTopCustomer};