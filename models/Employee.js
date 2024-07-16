const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  // Offine Information
  officeId: {
    type: Number,
    default: 101,
  },
  name: {
    type: String,
    default: "N/A",
  },
  gender: {
    type: String,
    default: "N/A",
  },
  nationality: {
    type: String,
    default: "Bangladeshi",
  },
  dob: {
    type: String,
    default: "N/A",
  },
  employeeType: {
    type: String,
    default: "Full Time",
  },
  joiningDate: {
    type: String,
    default: "N/A",
  },
  endDate: {
    type: String,
    default: "N/A",
  },
  projectName: {
    type: String,
    default: "N/A",
  },
  department: {
    type: String,
    default: "N/A",
  },
  designation: {
    type: String,
    default: "N/A",
  },
  officeEmail: {
    type: String,
    default: "N/A",
  },
  phoneNumber: {
    type: String,
    default: "1234567890",
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

  // Personal Information
  personalPhoneNumber: {
    type: String,
    default: "1234567890",
  },
  personalEmail: {
    type: String,
    default: "N/A",
  },
  presentAddress: {
    type: String,
    default: "N/A",
  },
  permanentAddress: {
    type: String,
    default: "N/A",
  },
  nid: {
    type: String,
    default: "N/A",
  },
  nidDoc: {
    type: String,
  },
  passport: {
    type: String,
    default: "N/A",
  },
  passportDoc: {
    type: String,
  },
  tin: {
    type: String,
    default: "N/A",
  },
  tinDoc: {
    type: String,
  },
  signatureDoc: {
    type: String,
  },
  emergencyNumber: {
    type: String,
    default: "1234567890",
  },
  relationShipNumber: {
    type: String,
    default: "1234567890",
  },

  // Bank Information
  bankName: {
    type: String,
    default: "N/A",
  },
  bankBranch: {
    type: String,
    default: "N/A",
  },
  accountNumber: {
    type: String,
    default: "X1215000012500020001",
  },
  routingNumber: {
    type: String,
    default: "X5484587",
  },
  accountTitle: {
    type: String,
    default: "Mr. Xyz",
  },
  accountEmail: {
    type: String,
    default: "N/A",
  },
});

module.exports = mongoose.model("Employee", employeeSchema, "Employee");
