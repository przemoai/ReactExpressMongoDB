const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  products: [{
    productId: {
      Type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },

  }, ],
  total: {
    type: Number
  },
  shippingAddres: {
    city: String,
    zipcode: String,
    street: String,
    houseNumber: String,
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Cart", CartSchema);