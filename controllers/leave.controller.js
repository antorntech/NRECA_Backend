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
    const { myemail } = req.params;

    // Query Leaves collection by email field
    const result = await Leaves.find({ email: myemail });

    if (!result || result.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Data not found",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.addLeaves = async (req, res, next) => {
  try {
    const dateFromFront = req.body.date;
    const newDate = [dateFromFront.join(",")];

    const dates = newDate[0].split(",");

    const date1 = new Date(dates[0]);
    const date2 = new Date(dates[1]);

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2 - date1);

    // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const days = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    // Uncomment the line below when you're ready to create the leave record
    const result = await Leaves.create({
      email: req.body.email,
      role: req.body.role,
      leaveCategory: req.body.leaveCategory,
      leaveType: req.body.leaveType,
      date: newDate,
      days: days + 1,
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
    if (typeof dateFromFront === "string") {
      const newDate = [dateFromFront];
      const dates = newDate[0].split(",");
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
        days: days + 1,
        reason: req.body.reason,
        remark: req.body.remark,
        status: req.body.status,
      });

      return res.status(200).json({
        status: "success",
        message: "Leave updated successfully!",
        data: result,
      });
    } else {
      const dates = dateFromFront[0].split(",");

      console.log(dates);

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
        days: days + 1,
        reason: req.body.reason,
        remark: req.body.remark,
        status: req.body.status,
      });

      return res.status(200).json({
        status: "success",
        message: "Leave updated successfully!",
        data: result,
      });
    }

    // Split the dates from the string
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
