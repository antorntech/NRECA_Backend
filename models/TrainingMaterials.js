const mongoose = require("mongoose");

const trainingMaterialSchema = new mongoose.Schema({
  trainingDocName: {
    type: String,
    default: "N/A",
  },
  projectName: {
    type: String,
    default: "N/A",
  },
  trainingDoc: {
    type: String,
  },
});

module.exports.TrainingMaterials = mongoose.model(
  "TrainingMaterials",
  trainingMaterialSchema,
  "TrainingMaterials"
);
