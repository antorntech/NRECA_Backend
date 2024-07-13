const express = require("express");
const app = express.Router();

const leaveControllers = require("../../controllers/leave.controller");

app.get("/", leaveControllers.allLeaves);
app.get("/:id", leaveControllers.singleLeaves);
app.get("/myLeaves/:myemail", leaveControllers.myLeaves);
app.post("/addLeaves", leaveControllers.addLeaves);
app.put("/update/:id", leaveControllers.updateLeaves);
app.delete("/delete/:id", leaveControllers.deleteLeaves);

module.exports = app;
