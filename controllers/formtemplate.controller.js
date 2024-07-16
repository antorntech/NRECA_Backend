const { FormTemplate } = require("../models/FormTemplate");

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

// Controller function to update a Form Template
module.exports.updateFormTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    if (req.file) {
      Object.assign(req.body, {
        fileDoc: `/uploads/documents/${req.file.filename}`,
      });
    }
    const formTemplate = await FormTemplate.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!formTemplate) {
      return res.status(404).json({ message: "Form Template not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Form Template updated successfully!",
      data: formTemplate,
    });
  } catch (error) {
    console.log(error);
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
