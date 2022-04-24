const mongoose = require("mongoose");
const Product = require("./Product");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  products: [{
    productId: {
      Type: String,
    },
    title: {
      type: String,
      require: true
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }, ],
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", OrderSchema);