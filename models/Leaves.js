const mongoose = require("mongoose");

const leavesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    leaveCategory: {
      type: String,
    },
    leaveType: {
      type: String,
    },
    date: {
      type: String,
    },
    reason: {
      type: String,
    },
    remark: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
    approvedBy: {
      type: String,
      default: "N/A",
    },
    approvedDate: {
      type: String,
      default: "N/A",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leaves", leavesSchema, "Leaves");
