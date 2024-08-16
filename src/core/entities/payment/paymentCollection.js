// ================== file to show the payment collection for the application =================== //

// importing the required modules
const mongoose = require("mongoose");

// creating the schema
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  paymentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true,
  },
  paymentFor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
});

// exporting the module for the payment History
module.exports = new mongoose.model("paymentHistory", paymentSchema);
