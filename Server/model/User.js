const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: {
      city: String,
      zipcode:String,
      street: String,
      houseNumber: String,}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
