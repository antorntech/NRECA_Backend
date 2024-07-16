const express = require("express");
const app = express.Router();
const documentscvController = require("../../controllers/documentscv.controller");

app.post("/", upload.single("cvDoc"), documentscvController.createDocumentCV);
app.get("/", documentscvController.getAllDocumentCVs);
app.get("/:id", documentscvController.getDocumentCVById);
app.put(
  "/:id",
  upload.single("cvDoc"),
  documentscvController.updateDocumentCVById
);
app.delete("/:id", documentscvController.deleteDocumentCVById);

module.exports = app;
