const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a Mongoose schema
const documentCVSchema = new Schema({
  fullName: {
    type: String,
  },
  field: {
    type: String,
    enum: [
      "MIS & IT",
      "GIS",
      "Environment and Gender",
      "Economist & Finance",
      "Capacity Building & Training",
      "Administration & Finance",
      "Consultant",
    ],
    required: true,
  },
  expertiseField: {
    type: String,
    enum: [
      "Civil Engineering",
      "Electrical Engineering",
      "Computer Engineering",
      "SCADA (Supervisory Control and Data Acquisition)",
      "Automation Engineering",
      "Design Engineering",
      "Installation Engineering",
      "Testing Engineering",
      "Commissioning Engineering",
      "Project Management (Technical)",
      "General & Management",
    ],
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  totalExperience: {
    type: String,
  },
  lastWorkstation: {
    type: String,
  },
  shortNote: {
    type: String,
  },
  cvType: {
    type: String,
  },
  cvDoc: {
    type: String,
  },
});

// Create a model based on the schema
module.exports.DocumentCV = mongoose.model(
  "DocumentCV",
  documentCVSchema,
  "DocumentCV"
);
