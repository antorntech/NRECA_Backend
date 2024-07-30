const { CompanyPolicy } = require("../models/CompanyPolicy");
const fs = require("fs/promises"); // Use 'fs' module for file operations
const path = require("path"); // Use 'path' module to manipulate file paths

// Controller function to create a new document CV
module.exports.createCompanyPolicy = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        policyDoc: `/uploads/documents/${req.file.filename}`,
      });
    }

    const result = await CompanyPolicy.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Company Policy created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to fetch all document CVs
module.exports.getAllCompanyPolicys = async (req, res) => {
  try {
    const companyPolicy = await CompanyPolicy.find();
    res.json(companyPolicy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch a single document CV by ID
module.exports.getCompanyPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyPolicy = await CompanyPolicy.findById(id);
    if (!companyPolicy) {
      return res.status(404).json({ message: "Company Policy not found" });
    }
    res.json(companyPolicy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateCompanyPolicyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        policyDoc: `/uploads/documents/${req.file.filename}`,
      });
    }

    const result = await CompanyPolicy.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Company Policy updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a document CV by ID
module.exports.deleteCompanyPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyPolicy = await CompanyPolicy.findByIdAndDelete(id);
    if (!companyPolicy) {
      return res.status(404).json({ message: "Company Policy not found" });
    }
    res.json({ message: "Company Policy deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
