const express = require("express");
const app = express.Router();

const employeeControllers = require("../../controllers/employee.controller");
const { auth } = require("../../middleware/auth");

app.get("/", employeeControllers.allEmployee);
app.get("/:id", employeeControllers.singleEmployee);
app.post(
  "/addEmployee",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "nidDoc", maxCount: 1 },
    { name: "passportDoc", maxCount: 1 },
    { name: "tinDoc", maxCount: 1 },
    { name: "signatureDoc", maxCount: 1 },
  ]),
  employeeControllers.addEmployee
);
app.put("/:id", upload.single("avatar"), employeeControllers.updateEmployee);
app.delete("/delete/:id", employeeControllers.deleteEmployee);

module.exports = app;
