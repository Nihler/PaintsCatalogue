const mongoose = require("mongoose");

const paintSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Paint", paintSchema);
