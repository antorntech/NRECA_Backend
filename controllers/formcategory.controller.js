const { FormCategory } = require("../models/FormCategory");
const fs = require("fs/promises");
// Controller function to create a new document CV
module.exports.createFormCategory = async (req, res) => {
  try {
    const result = await FormCategory.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Form Category created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to fetch all document CVs
module.exports.getAllFormCategorys = async (req, res) => {
  try {
    const FormCategorys = await FormCategory.find();
    res.json(FormCategorys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch a single Form Category
module.exports.getFormCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const FormCategory = await FormCategory.findById(id);
    if (!FormCategory) {
      return res.status(404).json({ message: "Form Category not found" });
    }
    res.json(FormCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateFormCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    // Update the Form Category with req.body
    const updatedFormCategory = await FormCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Form Category updated successfully!",
      data: updatedFormCategory,
    });
  } catch (error) {
    console.error("Error updating Form Category:", error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a Form Category
module.exports.deleteFormCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const formCategory = await FormCategory.findByIdAndDelete(id);
    if (!formCategory) {
      return res.status(404).json({ message: "Form Category not found" });
    }
    res.json({ message: "Form Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
