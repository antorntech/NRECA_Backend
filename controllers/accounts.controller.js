const Accounts = require("../models/Accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret123";

module.exports.allAccounts = async (req, res) => {
  try {
    const users = await Accounts.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error, "Error");
    res.send("Inter Server Error");
  }
};

module.exports.singleAccounts = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Accounts.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      message: "Data find successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Inter Server Error");
  }
};

module.exports.addAccounts = async (req, res, next) => {
  try {
    const result = await Accounts.create(req.body);
    return res.status(200).json({
      status: "success",
      message: "Data added successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.accountLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const Accounts = await Accounts.findOne({ username: username });
    if (!Accounts) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, Accounts.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: Accounts._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ status: "success", message: "Login successful", token });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateAccounts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Accounts = await Accounts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: Accounts,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteAccounts = async (req, res) => {
  try {
    const { id } = req.params;
    const Accounts = await Accounts.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Data deleted successfully!",
      data: Accounts,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};
