const express = require("express");
const app = express.Router();
const trainingMaterialsController = require("../../controllers/trainingmaterials.controller");

app.post(
  "/",
  upload.single("trainingDoc"),
  trainingMaterialsController.createTrainingMaterials
);
app.get("/", trainingMaterialsController.getAllTrainingMaterials);
app.get("/:id", trainingMaterialsController.getTrainingMaterialsById);
app.put(
  "/:id",
  upload.single("trainingDoc"),
  trainingMaterialsController.updateTrainingMaterialsById
);
app.delete("/:id", trainingMaterialsController.deleteTrainingMaterialsById);

module.exports = app;
