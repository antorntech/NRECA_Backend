const express = require("express");
const app = express.Router();

const leaveControllers = require("../../controllers/leave.controller");

app.get("/", leaveControllers.allLeaves);
app.get("/:id", leaveControllers.singleLeaves);
app.post("/addLeaves", upload.single("avatar"), leaveControllers.addLeaves);
app.put("/:id", upload.single("avatar"), leaveControllers.updateLeaves);
app.delete("/delete/:id", leaveControllers.deleteLeaves);

module.exports = app;
