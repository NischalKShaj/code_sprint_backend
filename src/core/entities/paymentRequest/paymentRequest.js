// ================== file to show the payout collection for the application =================== //

// importing the required modules
const mongoose = require("mongoose");

// defining the schema
const paymentRequest = new mongoose.Schema({
  tutor: {
    type: String,
    required: true,
  },
  wallet: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

// exporting the model
module.exports = new mongoose.model("paymentRequest", paymentRequest);
