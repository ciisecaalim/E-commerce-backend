const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    customer: {
        type: String,
        required: true // Fixed typo here
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
   totalAmount: { // ✅ correct spelling
    type: Number,
    required: true
}

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema); // Use "Order" instead of "order"