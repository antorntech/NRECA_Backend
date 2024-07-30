const mongoose = require("mongoose");

const companyPolicySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    default: "N/A",
  },
  policyName: {
    type: String,
    default: "N/A",
  },
  projectName: {
    type: String,
    default: "N/A",
  },
  policyDoc: {
    type: String,
  },
});

module.exports.CompanyPolicy = mongoose.model(
  "CompanyPolicy",
  companyPolicySchema,
  "CompanyPolicy"
);
