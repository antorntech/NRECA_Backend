const { DocumentCV } = require("../models/DocumentCV");

// Controller function to create a new document CV
module.exports.createDocumentCV = async (req, res) => {
  try {
    if (req.file) {
      Object.assign(req.body, {
        cvDoc: `/uploads/documents/${req.file.filename}`,
      });
    }

    const result = await DocumentCV.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Document CV created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to fetch all document CVs
module.exports.getAllDocumentCVs = async (req, res) => {
  try {
    const documentCVs = await DocumentCV.find();
    res.json(documentCVs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to fetch a single document CV by ID
module.exports.getDocumentCVById = async (req, res) => {
  try {
    const { id } = req.params;
    const documentCV = await DocumentCV.findById(id);
    if (!documentCV) {
      return res.status(404).json({ message: "Document CV not found" });
    }
    res.json(documentCV);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to update a document CV by ID
module.exports.updateDocumentCVById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    if (req.file) {
      Object.assign(req.body, {
        cvDoc: `/uploads/documents/${req.file.filename}`,
      });
    }
    const documentCV = await DocumentCV.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!documentCV) {
      return res.status(404).json({ message: "Document CV not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Document CV updated successfully!",
      data: documentCV,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controller function to delete a document CV by ID
module.exports.deleteDocumentCVById = async (req, res) => {
  try {
    const { id } = req.params;
    const documentCV = await DocumentCV.findByIdAndDelete(id);
    if (!documentCV) {
      return res.status(404).json({ message: "Document CV not found" });
    }
    res.json({ message: "Document CV deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
