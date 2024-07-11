const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    officeId: {
      type: Number,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    officeEmail: {
      type: String,
      required: true,
    },
    primaryMobNumber: {
      type: String,
    },
    secondaryMobNumber: {
      type: String,
    },
    avatar: {
      type: String,
      default: "N/A",
    },
    casualLeave: {
      type: Number,
      default: 10,
    },
    sickLeave: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema, "Employee");
