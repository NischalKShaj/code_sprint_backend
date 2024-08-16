// ================== file to show the problems category collection for the application =================== //

// importing the required modules
const mongoose = require("mongoose");

// creating the schema for the category
const problemCategory = new mongoose.Schema({
  category_name: {
    type: String,
  },
});

module.exports = new mongoose.model("problemCategory", problemCategory);
