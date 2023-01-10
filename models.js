const mongoose = require("mongoose");

const TargetSchema = mongoose.Schema({
  name: String,
  blockName: String,
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  z: { type: Number, default: 0 },
  description: { type: String, default: "" },
});

const Target = mongoose.model("TargetModel", TargetSchema);

module.exports = { Target };
