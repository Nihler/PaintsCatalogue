const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Paint = require("./paint");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  inventory: [],
  wishlist: [],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
