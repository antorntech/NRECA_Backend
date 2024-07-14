const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    officeId: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    nationality: {
      type: String,
    },
    dob: {
      type: String,
    },
    employeeType: {
      type: String,
    },
    joiningDate: {
      type: String,
    },
    endDate: {
      type: String,
      default: "Running",
    },
    projectName: {
      type: String,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    officeEmail: {
      type: String,
      required: true,
    },
    phoneNumber: {
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
    employeeType: {
      type: String,
      default: "Full Time",
    },
    employeeStatus: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema, "Employee");
