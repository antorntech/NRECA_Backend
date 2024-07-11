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

module.exports.addLeaves = async (req, res, next) => {
  try {
    const result = await Leaves.create(req.body);
    return res.status(200).json({
      status: "success",
      message: "Leave added successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateLeaves = async (req, res, next) => {
  try {
    const { id } = req.params;

    const Leaves = await Leaves.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: Leaves,
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
