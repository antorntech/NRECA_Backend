const express = require("express");
const app = express.Router();

const accountsController = require("../../controllers/accounts.controller");

app.get("/", accountsController.getAccounts);
app.get("/:id", accountsController.getSingleAccounts);
app.post("/register", accountsController.createAccounts);
app.post("/login", accountsController.accountsLogin);
app.put("/:accountsId", accountsController.updatedAccounts);
app.delete("/delete/:accountsId", accountsController.deleteAccounts);

module.exports = app;
