const express = require("express");
const app = express.Router();
const formTemplateController = require("../../controllers/formtemplate.controller");

app.post(
  "/",
  upload.single("fileDoc"),
  formTemplateController.createFormTemplate
);
app.get("/", formTemplateController.getAllFormTemplates);
app.get("/:id", formTemplateController.getFormTemplateById);
app.put(
  "/:id",
  upload.single("fileDoc"),
  formTemplateController.updateFormTemplateById
);
app.delete("/:id", formTemplateController.deleteFormTemplateById);

module.exports = app;
