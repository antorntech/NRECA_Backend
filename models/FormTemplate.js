const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a Mongoose schema
const formTemplateSchema = new Schema({
  fileCategory: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileDoc: {
    type: String,
  },
});

// Create a model based on the schema
module.exports.FormTemplate = mongoose.model(
  "FormTemplate",
  formTemplateSchema,
  "FormTemplate"
);
