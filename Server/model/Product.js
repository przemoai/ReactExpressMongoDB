const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    desc: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    categories: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: {type:Boolean, default:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
