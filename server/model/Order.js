const mongoose = require("mongoose");
const Product = require("./Product");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    products: [
      {
        productId: {
          Type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required:true },
    status: {type:String, default:"pending"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
