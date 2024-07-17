const express = require("express");
const app = express.Router();
const formCategoryController = require("../../controllers/formcategory.controller");

app.post("/", formCategoryController.createFormCategory);
app.get("/", formCategoryController.getAllFormCategorys);
app.get("/:id", formCategoryController.getFormCategoryById);
app.put("/:id", formCategoryController.updateFormCategoryById);
app.delete("/:id", formCategoryController.deleteFormCategoryById);

module.exports = app;
