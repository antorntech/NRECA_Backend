const { TrainingMaterials } = require("../models/TrainingMaterials");
const fs = require("fs/promises"); // Use 'fs' module for file operations
const path = require("path"); // Use 'path' module to manipulate file paths

// Controller function to create a new document CV
module.exports.createTrainingMaterials = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        trainingDoc: `/uploads/documents/${req.file.filename}`,
      });
    }

    const result = await TrainingMaterials.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Training Materials created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to fetch all document CVs
module.exports.getAllTrainingMaterials = async (req, res) => {
  try {
    const companyPolicy = await TrainingMaterials.find();
    res.json(companyPolicy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch a single document CV by ID
module.exports.getTrainingMaterialsById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyPolicy = await TrainingMaterials.findById(id);
    if (!companyPolicy) {
      return res.status(404).json({ message: "Training Materials not found" });
    }
    res.json(companyPolicy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateTrainingMaterialsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        trainingDoc: `/uploads/documents/${req.file.filename}`,
      });
    }

    const result = await TrainingMaterials.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Training Materials updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a document CV by ID
module.exports.deleteTrainingMaterialsById = async (req, res) => {
  try {
    const { id } = req.params;
    const companyPolicy = await TrainingMaterials.findByIdAndDelete(id);
    if (!companyPolicy) {
      return res.status(404).json({ message: "Training Materials not found" });
    }
    res.json({ message: "Training Materials deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
