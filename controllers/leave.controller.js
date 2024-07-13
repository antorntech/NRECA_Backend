const Leaves = require("../models/Leaves");

module.exports.allLeaves = async (req, res) => {
  try {
    const users = await Leaves.find();
    users.sort((a, b) => a.officeId - b.officeId);
    res.status(200).json(users);
  } catch (error) {
    console.log(error, "Error");
    res.send("Inter Server Error");
  }
};

module.exports.singleLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Leaves.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Data find successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data not find",
      error: error,
    });
  }
};

module.exports.myLeaves = async (req, res) => {
  try {
    const leaves = await Leaves.find({ email: req.body.email });
    res.status(200).json(leaves);
  } catch (error) {
    console.log(error, "Error");
    res.send("Inter Server Error");
  }
};

module.exports.addLeaves = async (req, res, next) => {
  try {
    const dateFromFront = req.body.date;

    // Split the dates from the string
    const dates = dateFromFront.split(",");

    // Parse the dates into Date objects
    const date1 = new Date(dates[0]);
    const date2 = new Date(dates[1]);

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2 - date1);

    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const days = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    // Uncomment the line below when you're ready to create the leave record
    const result = await Leaves.create({
      email: req.body.email,
      leaveCategory: req.body.leaveCategory,
      leaveType: req.body.leaveType,
      date: req.body.date,
      days: days,
      reason: req.body.reason,
      remark: req.body.remark,
      status: req.body.status,
    });

    return res.status(200).json({
      status: "success",
      message: "Leave added successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error, "Error");
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports.updateLeaves = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dateFromFront = req.body.date;

    // Split the dates from the string
    const dates = dateFromFront.split(",");

    // Parse the dates into Date objects
    const date1 = new Date(dates[0]);
    const date2 = new Date(dates[1]);

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2 - date1);

    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const days = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    // Uncomment the line below when you're ready to create the leave record
    const result = await Leaves.findByIdAndUpdate(id, {
      email: req.body.email,
      leaveCategory: req.body.leaveCategory,
      leaveType: req.body.leaveType,
      date: req.body.date,
      days: days,
      reason: req.body.reason,
      remark: req.body.remark,
      status: req.body.status,
    });

    return res.status(200).json({
      status: "success",
      message: "Leave updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeaves = await Leaves.findByIdAndDelete(id);

    return res.json(deletedLeaves);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
