const express = require("express");
const app = express.Router();
const companyPolicyController = require("../../controllers/companypolicy.controller");

app.post(
  "/",
  upload.single("policyDoc"),
  companyPolicyController.createCompanyPolicy
);
app.get("/", companyPolicyController.getAllCompanyPolicys);
app.get("/:id", companyPolicyController.getCompanyPolicyById);
app.put(
  "/:id",
  upload.single("policyDoc"),
  companyPolicyController.updateCompanyPolicyById
);
app.delete("/:id", companyPolicyController.deleteCompanyPolicyById);

module.exports = app;
