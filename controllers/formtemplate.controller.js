const { FormTemplate } = require("../models/FormTemplate");
const fs = require("fs/promises");
// Controller function to create a new document CV
module.exports.createFormTemplate = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        fileDoc: `/uploads/documents/${req.file.filename}`,
      });
    }

    const result = await FormTemplate.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Form Template created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to fetch all document CVs
module.exports.getAllFormTemplates = async (req, res) => {
  try {
    const formTemplates = await FormTemplate.find();
    res.json(formTemplates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch a single Form Template
module.exports.getFormTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const formTemplate = await FormTemplate.findById(id);
    if (!formTemplate) {
      return res.status(404).json({ message: "Form Template not found" });
    }
    res.json(formTemplate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateFormTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    // Find the existing form template
    const formTemplate = await FormTemplate.findById(id);

    if (!formTemplate) {
      return res.status(404).json({ message: "Form Template not found" });
    }

    // Delete old fileDoc if it exists
    if (formTemplate.fileDoc) {
      // Construct the path to the old file
      const filePath = `./public${formTemplate.fileDoc}`;

      // Check if the file exists and delete it
      try {
        await fs.unlink(filePath);
        console.log(`Deleted old file: ${filePath}`);
      } catch (err) {
        console.error(`Error deleting old file: ${err}`);
        // Handle error appropriately, e.g., log or send response
      }
    }

    // Update fileDoc if a new file was uploaded
    if (file) {
      const newFileDoc = `/uploads/documents/${file.filename}`;
      req.body.fileDoc = newFileDoc;
    }

    // Update the form template with req.body
    const updatedFormTemplate = await FormTemplate.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Form Template updated successfully!",
      data: updatedFormTemplate,
    });
  } catch (error) {
    console.error("Error updating form template:", error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a Form Template
module.exports.deleteFormTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const formTemplate = await FormTemplate.findByIdAndDelete(id);
    if (!formTemplate) {
      return res.status(404).json({ message: "Form Template not found" });
    }
    res.json({ message: "Form Template deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
