// Import Mongoose
const mongoose = require("mongoose");

// Define the Accounts schema
const accountsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "superadmin", // You can modify this for different roles if needed
  },
});

// Create the Accounts model
const Accounts = mongoose.model("Accounts", accountsSchema, "Accounts");

// Export the model
module.exports = Accounts;
